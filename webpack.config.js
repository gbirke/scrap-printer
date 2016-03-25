var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      path: path.resolve(__dirname, "web/js"),
      publicPath: '/',
      filename: 'main.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /nunjucks\/browser\/nunjucks\.js$/,
        loader: 'exports?nunjucks'
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ["es2015"],  
        }
      },
      // Extract css files
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
      },
    ]
  },
  // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
  plugins: [
        new ExtractTextPlugin("main.css")
  ],
  devServer: {
    contentBase: "./web"
  }
};