
REM npm 模块初始化及发布
npm init
npm adduser
npm whoami
npm publish

npm adduser --registry=https://registry.npmjs.org/
npm whoami --registry=https://registry.npmjs.org/
npm publish --registry=https://registry.npmjs.org/

npm i typescript -D

.\node_modules\.bin\tsc --init

npm i -D webpack-dev-server

npm i -D html-webpack-plugin

npm i -D  @babel/core @babel/preset-env babel-loader
npm i -s @babel/polyfill

REM Test
npm i mocha -D
npm i chai -D

REM Code coverage
npm i istanbul -D
npm i coveralls -D

npm audit fix --registry=https://registry.npmjs.org/
npm audit --registry=https://registry.npmjs.org/