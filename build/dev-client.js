// dev-client.js里面主要写了浏览器端代码，用于实现webpack的热更新。
// 实现浏览器端的EventSource，用于跟服务器双向通信
// webpack热重载客户端跟dev-server上的热重载插件之间需要进行双向通信
// 服务端webpack重新编译后，会向客户端推送信息，告诉客户端进行更新
'use strict'
require('eventsource-polyfill')
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
