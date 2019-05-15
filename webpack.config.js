const webpack = require('webpack');
const path = require('path');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry:{
      js: path.join(__dirname, 'admin/public', '/js','js.js')      
  },
  output: {
    path: path.join(__dirname, 'admin/public', 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
       {loader: ['babel-loader']},
      // { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      // {test: /\.css$/, loader: 'css-loader'}
    ]
  },plugins: [
  //  new UglifyJsPlugin()
  ],
   devtool: 'cheap-module-source-map',
//    optimization: {
//     splitChunks: {
//       cacheGroups: {
//         commons: {
//           test: /[\\/]node_modules[\\/]/,
//           name: "vendor",
//           chunks: "all"
//         }
//       }
//     }
//   }
   
}