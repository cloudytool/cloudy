import * as path from 'node:path'
import * as crypto from 'node:crypto'
import * as fs from 'fs-extra'

import {Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import * as writeYamlFile from 'write-yaml-file'
import {execSync} from 'node:child_process'

type regionZones = {
  [key: string]: string[]
}

type regionAmi = {
  [key: string]: string
}

const getAvailableZones = (region: string) => {
  const regionZones: regionZones = {
    'us-east-1': ['us-east-1a', 'us-east-1b', 'us-east-1c', 'us-east-1d', 'us-east-1e'],
    'us-east-2': ['us-east-2a', 'us-east-2b', 'us-east-2c'],

    'us-west-1': ['us-west-1a', 'us-west-1b'],
    'us-west-2': ['us-west-2a', 'us-west-2b', 'us-west-2c'],

    'eu-west-1': ['eu-west-1a', 'eu-west-1b', 'eu-west-1c'],
    'eu-central-1': ['eu-central-1a', 'eu-central-1b'],

    'ap-southeast-1': ['ap-southeast-1a', 'ap-southeast-1b'],
    'ap-southeast-2': ['ap-southeast-2a', 'ap-southeast-2b', 'ap-southeast-2c'],

    'ap-northeast-1': ['ap-northeast-1a', 'ap-northeast-1b', 'ap-northeast-1c'],
    'ap-northeast-2': ['ap-northeast-2a', 'ap-northeast-2c'],

    'ap-south-1': ['ap-south-1a', 'ap-south-1b'],

    'sa-east-1': ['sa-east-1a', 'sa-east-1b', 'sa-east-1c'],
  }

  return regionZones?.[region]
}

const getUbuntu2004Ami = (region: string) => {
  const regionAmi: regionAmi = {
    'us-east-1': 'ami-0924c0eab44755b7a',
    'us-east-2': 'ami-0f2891f9820eeec74',

    'us-west-1': 'ami-01c850eb8ee4f6f48',
    'us-west-2': 'ami-085ba1368c44ae288',

    'eu-west-1': 'ami-0344d9b64e880a596',
    'eu-west-2': 'ami-0459f75db72a4b9a7',
    'eu-central-1': 'ami-07a99561151e14879',

    'ap-southeast-1': 'ami-0580691dc3aeb85f4',
    'ap-southeast-2': 'ami-02aeffc52375f7e34',

    'ap-northeast-1': 'ami-0e4cd2f26990dfb1f',
    'ap-northeast-2': 'ami-09a0f33f03e35493b',

    'ap-south-1': 'ami-0ae52aabc5b26f25a',

    'sa-east-1': 'ami-0b91f999dbc798855',
  }

  return regionAmi?.[region]
}

export default class Init extends Command {
  static description = 'Initialize a new project'

  static examples = [
    '<%= config.bin %> <%= command.id %> aws-cluster',
  ]

  static flags = {
    root: Flags.string({char: 'r', description: 'Root path to the project'}),
  }

  static args = [{
    name: 'projectName',
    required: true,
  }]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Init)

    const cwd = process.cwd()
    const {projectName} = args
    const projectRoot = flags.root ?? cwd
    const projectPath = path.join(projectRoot, 'projects', projectName)

    const pulumiConfigPath = path.join(projectPath, `Pulumi.${projectName}.yaml`)

    if (fs.existsSync(projectPath)) {
      this.error('Project already exists')
    }

    const awsProfile = await cli.prompt('AWS credentials profile', {default: 'default'})
    const awsRegion = await cli.prompt('AWS region', {default: 'us-east-1'})

    const awsZones = getAvailableZones(awsRegion)

    if (!awsZones) {
      this.error(`No zones found for region ${awsRegion}`)
    }

    const awsZone = await cli.prompt('AWS zone', {default: awsZones[0]})

    const awsS3AccessKeyId = await cli.prompt('AWS S3 access key id (for tokens exchange)')
    const awsS3SecretAccessKey = await cli.prompt('AWS S3 secret access key (for tokens exchange)')

    const workersCount = await cli.prompt('Workers count', {default: '1'})
    const instanceType = await cli.prompt('Worker instance type', {default: 't2.medium'})
    const ebsVolumeSize = await cli.prompt('EBS volume size (GB)', {default: '70'})

    let domainName = await cli.prompt('Project domain name')
    const lastDomainChar = domainName.charAt(domainName.length - 1)

    // remove last dot from the domain
    if (lastDomainChar === '.') {
      domainName = domainName.slice(0, -1)
    }

    const dbNeeded = await cli.confirm('Do you need cloud database? (yes/no)')

    let dbUser
    let dbPass
    let dbName

    let dbConfig = {
      'db:allocatedStorage': 30,
      'db:maxAllocatedStorage': 100,
      'db:engine': 'postgres',
      'db:engineVersion': 12.1,
      'db:engineGroupName': 'default.postgres12',
      'db:instanceClass': 'db.t3.medium',
      'db:user': '',
      'db:pass': '',
      'db:databaseName': '',
      'db:storageType': 'gp2',
      'db:backupRetentionPeriod': 3,
      'db:backupWindow': '03:00-04:00',
      'db:deleteAutomatedBackups': false,
      'db:deletionProtection': false,
      'db:finalSnapshotIdentifier': `${projectName}-db-final-snapshot`,
      'db:skipFinalSnapshot': true,
    }

    if (dbNeeded) {
      dbUser = `${projectName}user`
      dbPass = crypto.randomBytes(20).toString('hex')
      dbName = dbUser

      dbConfig = {
        ...dbConfig,
        'db:user': dbUser,
        'db:pass': dbPass,
        'db:databaseName': dbName,
      }
    }

    execSync(`git clone --progress https://github.com/cloudylab-net/pulumi-aws-cluster.git ${projectPath}`, {stdio: 'inherit'})

    const ami = getUbuntu2004Ami(awsRegion)

    const users = [{
      's3-examples': {
        Version: '2012-10-17',
        Statement: {
          Sid: 'AllObjectActions',
          Action: ['s3:*Object'],
          Effect: 'Allow',
          Resource: '*',
        },
      },
    }]

    const pulumiConfig = {
      encryptionsalt: 'v1:NXHcHtVQQ4M=:v1:6QZlxzHc1KMxWwiv:gYgSzNAgfFItMtLFZhGSSfsf5S5jPQ==',
      config: {
        'cluster:workerTokenPath': '/tmp/swarm/worker_token',
        'aws:profile': awsProfile,
        'aws:region': awsRegion,
        's3:accessKeyId': awsS3AccessKeyId,
        's3:secretAccessKey': awsS3SecretAccessKey,
        'ec2:projectName': projectName,
        'ec2:masters': 1,
        'ec2:slaves': Number.parseInt(workersCount, 10),
        'ec2:default/ami': ami,
        'ec2:default/machineType': instanceType,
        'ec2:default/zone': awsZone,
        'ec2:default/rootVolumeSize': 40,
        'ec2:default/ebsVolumeSize': Number.parseInt(ebsVolumeSize, 10),
        'ec2:default/ebsDeviseName': '/dev/sdb',
        'app:domainName': domainName,
        'iam:users': users,
        ...dbConfig,
      },
    }

    await writeYamlFile(pulumiConfigPath, pulumiConfig)
  }
}
