import {Command, Flags} from '@oclif/core'
import {execSync} from 'node:child_process'
import {readdirSync} from 'node:fs'
import inquirer = require('inquirer');
import {join, resolve} from 'node:path'
import {webpack} from 'webpack'
import {
  getComponentsJson,
  getProjectPackageJson,

  setProjectPackageJson,
} from '../utils'
import {basePath} from '../utils/constant'
const option = require('../config/webpack.config.js')

const componentsList = () => {
  const filesPath = readdirSync(`${basePath}/src/`)
  return {
    options: filesPath,
    choices: filesPath.map(item => ({name: item})),
  }
}

type FLagsType = {
  help: void;
  specify: string | undefined;
  small: number;
  mid: number;
  large: number;
  author: string | undefined;
  description: string | undefined;
  list: string | undefined;
};

export default class Publish extends Command {
  static examples = [
    '$ JuggleDV publish [component version]',
    "$ version format like '1.0.1' ",
  ];

  static flags = {
    help: Flags.help({
      char: 'h',
    }),
    specify: Flags.string({
      char: 'v',
      description: 'Publish specify version',
    }),
    small: Flags.integer({
      default: 1,
      char: 's',
      description: 'In regular iterations using (defualt)',
    }),
    mid: Flags.integer({
      default: 0,
      char: 'm',
      description: 'Use when functional changes occur',
    }),
    large: Flags.integer({
      default: 0,
      char: 'l',
      description: 'Use when disruptive changes occur',
    }),
    author: Flags.string({
      char: 'a',
      description: 'Specify the author of the component',
    }),
    description: Flags.string({
      char: 'd',
      description: 'Update the description of the component',
    }),
    list: Flags.string({
      char: 'l',
      description: 'Publish multi-components',
      options: componentsList().options,
    }),
  };

  publish = async (
    {
      specify,
      small,
      mid,
      large,
      author: newAuthor,
      description: newDescription,
    }: FLagsType,
    compPath: string,
    editorPath: string,
  ) => {
    const packageInfo: PackageJson = getProjectPackageJson(compPath)
    const newInfor = {
      version: specify ?? [large, mid, small],
      description: newDescription,
      author: newAuthor,
    }
    for (const key of Object.keys(newInfor)) {
      const item = (newInfor as any)[key]
      if (Array.isArray(item)) {
        const version = packageInfo.version.split('.')
        for (const [index, verItem] of version.entries())
          (version[index] = String(Number(verItem) + Number(item[index])))

        packageInfo.version = version.join('.')
      } else {
        item && ((packageInfo as any)[key] = item)
      }
    }

    setProjectPackageJson(packageInfo, compPath)
    await new Promise(res => {
      webpack(option(compPath), res)
    })

    execSync(`cd ${compPath} && npm publish`)

    this.log('upload pack to oss')

    // Update component store
    // const compStorePath = resolve(basePath, "../../");
    const compStore = getComponentsJson(editorPath)

    for (const item of compStore.components) {
      console.log(item.name, packageInfo.name, packageInfo.version)
      if (item.name === packageInfo.name.split('/')[1]) {
        item.version = packageInfo.version
      }
    }
  };

  async run() {
    const {flags} = await this.parse(Publish)

    const inComponent = basePath.includes('src')
    const list: string[] =
      !inComponent &&
      (
        await inquirer.prompt([
          {
            name: 'list',
            message: 'select publish components',
            type: 'checkbox',
            choices: componentsList().choices,
          },
        ])
      ).list

    if (inComponent) {
      return  this.publish(flags, basePath, resolve(basePath, '../../'))
    }

    for await (const path of list) {
      const compPath = join(basePath, `src/${path}`)
      await this.publish(flags, compPath, basePath)
    }
  }
}
