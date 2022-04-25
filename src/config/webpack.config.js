const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = path => ({
  entry: {
    compEntry: `${path}/src/index.tsx`,
    'compEntry.min': `${path}/src/index.tsx`,
    compConf: `${path}/src/config.ts`,
    'compConf.min': `${path}/src/config.ts`,
  },
  stats: 'errors-only',
  output: {
    path: `${path}/_bundles`,
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'inline-source-map',
  optimization: {
    minimizer: [new UglifyJsPlugin()],
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
