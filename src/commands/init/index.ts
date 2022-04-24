import * as path from 'node:path'
import * as crypto from 'node:crypto'
import * as fs from 'fs-extra'

import {Command, Flags} from '@oclif/core'
import cli from 'cli-ux'
import * as writeYamlFile from 'write-yaml-file'
import {execSync} from 'node:child_process'

export default class Init extends Command {
  static description = 'Initialize a new project'

  static examples = [
    '<%= config.bin %> <%= command.id %> aws-cluster',
  ]

  static flags = {
    root: Flags.string({char: 'r', description: 'Root path of the project'}),
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

    const pulumiProjectPath = path.join(projectPath, 'Pulumi.yaml')
    const pulumiConfigPath = path.join(projectPath, `Pulumi.${projectName}.yaml`)

    if (fs.existsSync(projectPath)) {
      this.error('Project already exists')
    }

    const awsProfile = await cli.prompt('AWS credentials profile', {default: 'default'})
    const awsRegion = await cli.prompt('AWS region', {default: 'us-east-1'})

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
    let dbConfig = {}

    if (dbNeeded) {
      dbUser = `${projectName}user`
      dbPass = crypto.randomBytes(20).toString('hex')
      dbName = dbUser

      dbConfig = {
        'db:allocatedStorage': 30,
        'db:maxAllocatedStorage': 100,
        'db:engine': 'postgres',
        'db:engineVersion': 12.4,
        'db:engineGroupName': 'default.postgres12',
        'db:instanceClass': 'db.t3.medium',
        'db:user': dbUser,
        'db:pass': dbPass,
        'db:databaseName': dbName,
        'db:storageType': 'gp2',
        'db:backupRetentionPeriod': 3,
        'db:backupWindow': '03:00-04:00',
        'db:deleteAutomatedBackups': false,
        'db:deletionProtection': false,
        'db:finalSnapshotIdentifier': `${projectName}-db-final-snapshot`,
        'db:skipFinalSnapshot': true,
      }
    }

    execSync(`git clone --progress https://github.com/cloudylab-net/pulumi-aws-cluster.git ${projectPath}`)

    await writeYamlFile(pulumiProjectPath, {
      name: projectName,
      runtime: 'nodejs',
      description: `${projectName} in AWS`,
    })

    const exchangeBucketId = (Math.random() + 1).toString(36).slice(7)

    const pulumiConfig = {
      encryptionsalt: 'v1:wUxgiwMWJko=:v1:F2fhIrmQIzxxlH7j:sa8sNszrg8kVS9YxWkTOeNX65aK1jg==',
      config: {
        'cluster:workerTokenPath': '/tmp/swarm/worker_token',
        'aws:profile': awsProfile,
        'aws:region': awsRegion,
        's3:exchangeBucket': `exchange-bucket-${exchangeBucketId}`,
        's3:accessKeyId': awsS3AccessKeyId,
        's3:secretAccessKey': awsS3SecretAccessKey,
        'ec2:projectName': projectName,
        'ec2:masters': 1,
        'ec2:slaves': Number.parseInt(workersCount, 10),
        'ec2:default/ami': 'ami-0d777ad7d8b566f8c', // ubuntu 20.04 x86
        'ec2:default/machineType': instanceType,
        'ec2:default/zone': 'us-east-1a',
        'ec2:default/rootVolumeSize': 40,
        'ec2:default/ebsVolumeSize': Number.parseInt(ebsVolumeSize, 10),
        'ec2:default/ebsDeviseName': '/dev/sdb',
        'app:domainName': domainName,
        ...dbConfig,
      },
    }

    await writeYamlFile(pulumiConfigPath, pulumiConfig)
  }
}
