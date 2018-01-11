const path = require('path');
const webpack = require('webpack');
const { version } = require('./package.json');

module.exports = {
  target: 'node',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'telebug.js',
    library: 'telebug',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(version),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(version),
    }),
  ],
  node: {
    process: false,
  },
};
