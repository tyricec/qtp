const path = require('path')

const config = {
  devServer: {
    publicPath: '/dist/',
  },
  devtool: 'cheap-module-eval-source-map',
  entry: path.resolve(__dirname, 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', },
    ],
  },
}

module.exports = config