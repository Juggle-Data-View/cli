import {Command, Flags} from '@oclif/core'
import {execSync} from 'node:child_process'
import {prompt} from 'cli-ux/lib/prompt'
import {existsSync, mkdirSync} from 'node:fs'
import {setComponentsJson} from '../utils'
import {basePath, cliTemplateBranch, repoBase} from '../utils/constant'
export default class Init extends Command {
  static examples = ['JuggleDV init -f <directory-path>'];

  static flags = {
    file: Flags.string({
      char: 'f',
      default: './',
      description: 'CLI-created directories ',
    }),
  };

  async run() {
    const {flags} = await this.parse(Init)
    const {file} = flags
    const isDefault = file === './'
    const projectPath = isDefault ? basePath : `${basePath}/${file}`
    if (!existsSync(projectPath)) {
      mkdirSync(projectPath, {recursive: true})
    }

    const git = execSync(
      `git clone ${repoBase} -b ${cliTemplateBranch} ${projectPath}`,
    )
    this.log(git.toString())
    const author = await prompt("What's your ERP ")
    const createTime = Date.now()

    // Initial components local db
    setComponentsJson(
      {
        author,
        createTime,
        components: [],
      },
      projectPath,
    )

    const installDep = execSync(`cd ${projectPath}/ && yarn`)
    this.log(installDep.toString())
    this.log(
      "JuggleDV development env is initial\n run 'cd " +
      projectPath +
      " && JuggleDV create myComp'",
    )
  }
}
