const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: ["@babel/polyfill", "./src/app.ts"],
  devServer: {
    contentBase: path.join(__dirname, "dev-dist"),
    port: 9000,
  },
  output: {
    path: path.resolve(__dirname, 'dev-dist'),
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
