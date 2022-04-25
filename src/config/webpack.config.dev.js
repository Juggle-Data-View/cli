const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const {SourceMapDevToolPlugin} = require('webpack')
const basePath = process.env.PWD
const {remoteAssetPath} = require('../utils/constant')

module.exports = path => ({
  entry: {
    compEntry: `${basePath}/src/index.tsx`,
    'compEntry.min': `${basePath}/src/index.tsx`,
    compConf: `${basePath}/src/config.ts`,
    'compConf.min': `${basePath}/src/config.ts`,
  },
  stats: 'errors-only',
  watch: true,
  output: {
    path: `${basePath}/_bundles`,
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  devtool: false,
  plugins: [
    new SourceMapDevToolPlugin({
      append: `\n//# sourceMappingURL=${remoteAssetPath}${path}/[url]`,
      filename: '[name].map',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /(\.tsx?$|\.ts?$)/,
        sourceMap: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /^react$/,
        use: 'null-loader',
      },
      {
        test: /^react\/jsx-rutime$/,
        use: 'noop-loader',
      },
    ],
  },
})
