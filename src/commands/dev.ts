import {Command} from '@oclif/core'
import {resolve} from 'node:path'
import {Compilation, webpack} from 'webpack'
import * as middleware from 'webpack-dev-middleware'
import {getComponentsJson, getProjectPackageJson} from '../utils'
import {basePath} from '../utils/constant'
const webpackOption = require('../config/webpack.config.dev.js')
type PreviousType = {
  'compConf.js': string | Buffer;
  'compEntry.js': string | Buffer;
  'compEntry.map': string | Buffer;
  'compConfig.map': string | Buffer;
};

export default class Dev extends Command {
  previous: PreviousType = {
    'compConf.js': '',
    'compEntry.js': '',
    'compConfig.map': '',
    'compEntry.map': '',
  };

   pushChangeAssest = (
     comp: Compilation,
     assetName: keyof PreviousType,
   ) => {
     const file = comp.getAsset(assetName)?.source.source()
     if (this.previous[assetName] !== file && file) {
       this.previous[assetName] = file
     }
   }

   async run() {
     // createServer()
     const compJsonPath = resolve(basePath, '../../')
     const {version, name} = getProjectPackageJson()
     const {author} = getComponentsJson(compJsonPath)
     const compiler = webpack(
       webpackOption(`${author}/${name.split('/')[1]}/${version}`),
     )
     middleware(compiler, {
       writeToDisk: () => {
         return false
       },
     })

     compiler.hooks.afterCompile.tap('after', comp => {
       this.pushChangeAssest(comp, 'compConf.js')
       this.pushChangeAssest(comp, 'compEntry.js')
       this.pushChangeAssest(comp, 'compConfig.map')
       this.pushChangeAssest(comp, 'compEntry.map')
       // TODO: Trigger the main system auto update specify file
     })
   }
}
