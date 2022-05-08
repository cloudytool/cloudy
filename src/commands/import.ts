import * as path from 'node:path'
import {execSync} from 'node:child_process'
import {Command, Flags} from '@oclif/core'
import Doctor from './doctor'

export default class Import extends Command {
  static description = 'Import Pulumi project state'

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
    const {args, flags} = await this.parse(Import)

    const cwd = process.cwd()
    const {projectName} = args
    const projectRoot = flags.root ?? cwd
    const projectPath = path.join(projectRoot, 'projects', projectName)

    await Doctor.run()

    const cmdName = this.constructor.name.toLowerCase()

    const cmd = [
      'export PULUMI_CONFIG_PASSPHRASE=""',
      `cd ${projectPath}`,
      'yarn',
      `${process.env.SHELL} ${cmdName}.sh ${projectName}`,
    ].join(' && ')

    execSync(`(${cmd})`, {stdio: 'inherit'})
  }
}