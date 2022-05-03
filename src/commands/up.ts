import * as path from 'node:path'
import {execSync} from 'node:child_process'
import {Command, Flags} from '@oclif/core'

export default class Up extends Command {
  static description = 'Run deployment update of the project'

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
    const {args, flags} = await this.parse(Up)

    const cwd = process.cwd()
    const {projectName} = args
    const projectRoot = flags.root ?? cwd
    const projectPath = path.join(projectRoot, 'projects', projectName)

    execSync(`(PULUMI_CONFIG_PASSPHRASE= cd ${projectPath} && sh up.sh ${projectName})`, {stdio: 'inherit'})
  }
}
