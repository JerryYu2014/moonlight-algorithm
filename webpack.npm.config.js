const path = require('path');

module.exports = {
  mode: 'production',

  entry: './lib/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'moonlight-algorithm',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
};
