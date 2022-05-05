import {Command} from '@oclif/core'
import * as which from 'which'

export default class Doctor extends Command {
  static description = 'Check CLI issues'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    const hasGit = which.sync('git', {nothrow: true})
    const hasYarn = which.sync('yarn', {nothrow: true})
    const hasPulumi = which.sync('pulumi', {nothrow: true})

    if (!hasGit) {
      this.error('Please install git (https://git-scm.com/downloads)')
    }

    if (!hasYarn) {
      this.error('Please install yarn (https://classic.yarnpkg.com/lang/en/docs/install)')
    }

    if (!hasPulumi) {
      this.error('Please install pulumi (https://www.pulumi.com/docs/get-started/install)')
    }

    this.log('** Everything looks good! **')
  }
}
