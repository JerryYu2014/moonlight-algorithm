const path = require('path');

module.exports = {
  // 提供 mode 配置选项，告知 webpack 使用相应模式的内置优化
  mode: 'production',

  // 构建目标(targets)
  // target: 'node',
  // target: 'web', // <=== 默认是 'web'，可省略

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
