const path = require('path');
const webpack = require('webpack');
const { version } = require('./package.json');

const common = {
  entry: './src/index.js',
  output: {
    publicPath: './dist/',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'telebug',
    filename: 'index.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEV': JSON.stringify(process.env.DEV),
      'process.env.VERSION': JSON.stringify(version),
    }),
    new webpack.BannerPlugin(version),
  ],
};

const serverConfig = {
  ...common,
  target: 'node',
  externals: ['process'],
};

const clientConfig = {
  ...common,
  target: 'web',
  output: {
    ...common.output,
    filename: 'index.umd.js',
  },
  plugins: [
    ...common.plugins,
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true),
    }),
  ],
};

module.exports = [clientConfig, serverConfig];
