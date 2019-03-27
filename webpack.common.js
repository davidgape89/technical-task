const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
  },
  devtool: 'sourcemap',
  module: {
    rules: [
      {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
      },
      {
          test: /\.(css|scss)$/,
          use: [
              'style-loader', 
              'css-loader', 
              'sass-loader'
          ]
      }
    ]
  }
};