var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    // 'main.less',
    './demo01/main',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/',
      filename: 'main.js'
  },
  // debug: true,
  devtool: 'source-map',
  module: {
    rules: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      { 
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader', 
          'autoprefixer-loader', 
          'less-loader'
        ]
      },
    ]
  },
  devServer: {
    // contentBase: "./src"
  }
};
