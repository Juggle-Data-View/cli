import {Command, Flags} from '@oclif/core'
import {basePath, componentTemplateBranch, repoBase} from '../utils/constant'
import {execSync} from 'node:child_process'
import {existsSync, mkdirSync, writeFileSync} from 'node:fs'
import * as NodeRSA from 'node-rsa'
import {
  getComponentsJson,
  getProjectPackageJson,
  setComponentsJson,
  setProjectPackageJson,
} from '../utils'

export default class CreateComponents extends Command {
  static description =
    'Create a new component. It must to run in project root dir';

  static examples = ['$ JuggleDV create [comp-name]'];

  static flags = {
    help: Flags.help({char: 'h'}),
    branch: Flags.string({char: 'b'}),
  };

  static args = [{name: 'compName', require: true}];

  async run() {
    const {args, flags} = await this.parse(CreateComponents)

    const key = new NodeRSA({b: 512})

    const branchName = flags.branch ?? componentTemplateBranch

    const compsPublic = `${basePath}/src/${args.compName}`
    if (!existsSync(compsPublic)) {
      mkdirSync(compsPublic, {recursive: true})
    }

    this.log('Get component template from ', `${repoBase}/${branchName}`)
    const git = execSync(
      `git clone ${repoBase} -b ${branchName} ${compsPublic}`,
    )

    this.log('init component information')
    const packageJSON = getProjectPackageJson(compsPublic)
    packageJSON.name = packageJSON.name.split('/')[0] + '/' + args.compName
    setProjectPackageJson(packageJSON, compsPublic)
    const keyData = `${packageJSON.author}__${packageJSON.createTime}`
    // Generate public key
    const encrypted = key.encrypt(keyData, 'base64')

    // Generate private key
    const encryptPrivate = key.encryptPrivate(keyData).toString('base64')

    writeFileSync(`${compsPublic}/pub.key`, encrypted)
    writeFileSync(`${compsPublic}/priv.key`, encryptPrivate)

    this.log('Update components store ')
    const {version} = packageJSON
    const compStore = getComponentsJson()
    const compDes = {
      version: version,
      name: args.compName,
    }

    setComponentsJson({
      ...compStore,
      components: [...compStore.components, compDes],
    })

    this.log(git.toString())

    this.log('Install components dependence')
    const installDep = execSync(`cd ${compsPublic}/ && yarn`)

    this.log(installDep.toString())
  }
}
