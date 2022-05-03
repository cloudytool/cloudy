import {Command} from '@oclif/core'
import * as which from 'which'

export default class Doctor extends Command {
  static description = 'Check CLI issues'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    const hasPulumi = which.sync('pulumi', {nothrow: true})

    if (!hasPulumi) {
      this.error('Please install pulumi (https://www.pulumi.com/docs/get-started/install/)')
    }

    this.log('** Everything looks good! **')
  }
}
