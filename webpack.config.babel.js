const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');


const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'web')
};


const common = {
  entry: [
    'babel-polyfill',
    './src/main'
  ],
  output: {
      path: PATHS.build,
      publicPath: '/',
      filename: 'js/main.js'
  },
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
      }
    ]
  },
  // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
  plugins: [
        new ExtractTextPlugin("css/main.css")
  ]
}

// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
      entry: [
        'babel-polyfill',
        './src/main',
        'webpack-dev-server/client?http://localhost:8080'
      ],
      module: {
        loaders: [
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
          }
        ]
      },
      debug: true,
      devtool: 'source-map',
      devServer: {
        inline: true,
        contentBase: "./web"
      }
    }
  );
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    debug: false,
    module: {
        loaders: [
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize")
          },
        ]
      }
  });
}
