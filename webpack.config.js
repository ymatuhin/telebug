const path = require('path');
const webpack = require('webpack');

const isBrowser = !!process.env.BROWSER;
const isNode = !isBrowser;

const common = {
  entry: './src/index.js',
  output: {
    publicPath: './dist/',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'telebug',
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
      'process.env.BROWSER': JSON.stringify(process.env.BROWSER),
    }),
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
};

module.exports = isBrowser ? clientConfig : serverConfig;
