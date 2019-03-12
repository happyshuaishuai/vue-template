// npm run dev




'use strict'
// 检查Node和Npm版本
require('./check-versions')()

// 获取 config/index.js 的默认配置
const config = require('../config')

// （env == environment,dev == development）
// 如果 Node 的环境无法判断当前是 dev / product 环境
// 使用 config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) {
  // parse:字符串=>JSON对象  stringify:JSON对象=>字符串
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn') // 一个可以强制打开浏览器并跳转到指定 url 的插件,也可以打开其他的
const path = require('path') // 使用 NodeJS 自带的文件路径工具
const express = require('express') // 使用 express服务器中间件
const webpack = require('webpack')
// 这个玩意儿可以做跨域的api请求代理
const proxyMiddleware = require('http-proxy-middleware')
// 通过process.env.NODE_ENV来判断，使用 dev?prod 环境的 webpack 配置
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// 如果没有指定运行端口，使用 config.dev.port 作为运行端口
const port = process.env.PORT || config.dev.port
// 是否自动打开浏览器
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置
const proxyTable = config.dev.proxyTable

// 使用 express 启动一个服务 (node服务器组件)
const app = express()

// ★★★★★★★★★★★★★★★★★★★★ 启动 webpack 进行编译 ★★★★★★★★★★★★★★★★★★
const compiler = webpack(webpackConfig)

// 启动 webpack-dev-middleware，将 编译后的文件暂存到内存中
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload热更新
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000 //多少秒发一次包
})

// webpack(重新)编译打包【完成后】并将js、css等文件inject到html文件之后，通过热重载中间件强制页面刷新
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// 将 Hot-reload 挂在到 express 服务上
app.use(hotMiddleware)

// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
Object.keys(proxyTable).forEach(function (context) {
  const options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 使用 HTML5 history API 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)

// 拼接 static 文件夹的静态资源路径
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 为静态资源提供响应服务
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

// 正在启服务器。。。。。
console.log('正在启动dev server,oh yeah')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

// 暴露本模块的功能给外部使用，例如下面这种用法
// var devServer = require('./build/dev-server')
// devServer.ready.then(() => {...})
// if (...) { devServer.close() }
module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
