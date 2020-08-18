const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: ["@babel/polyfill", "./src/app.ts"],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // hot:true,    //默认值为 true，所以可以不用设置
    port: 9000,
    // watchOptions: {
    //  poll: 1000
    // }
  },
  // entry: './lib/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.js$/,
        exclude: __dirname + "node_modules",
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })]
};

// const path = require("path");
// const webpack = require("webpack");

// module.exports = {
//     entry: ["@babel/polyfill", "./index.js"],
//     devServer: {
//         contentBase: path.join(__dirname, "dist"), 
//         // hot:true,    //默认值为 true，所以可以不用设置
//         port: 9000,
//         // watchOptions: {
//         //  poll: 1000
//         // }
//     },
//     output: {
//         filename: "bundle.js",
//         path: path.resolve(__dirname, "dist")
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: __dirname + "node_modules",
//                 use: {
//                     loader: "babel-loader"
//                 }
//             }
//         ]
//     },
//     plugins: [new webpack.HotModuleReplacementPlugin()]
// };