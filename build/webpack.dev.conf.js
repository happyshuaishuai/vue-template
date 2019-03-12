'use strict'
// 使用一些小工具
const utils = require('./utils')
// 使用webpack
const webpack = require('webpack')
// 使用了 config/index.js
const config = require('../config')
// webpack自带的合并方法
const merge = require('webpack-merge')
// 加载 webpack 公用基础配置
const baseWebpackConfig = require('./webpack.base.conf')
// html-webpack-plugin 插件，这个插件可以帮我们自动生成 html 并且注入到 .html 文件中
// 简而言之，就是自动在index.html里面加上<link>和<script>标签引用webpack打包后的文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 友好的错误提示插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 给每个入口页面(应用)加上dev-client，用于跟dev-server的热重载插件通信，实现热更新
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})


// 将我们 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置合并
module.exports = merge(baseWebpackConfig, {
  module: {
    // 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // 使用 #cheap-module-eval-source-map 模式作为开发工具
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
     // 开启webpack热更新功能
    new webpack.HotModuleReplacementPlugin(),
     // 使用了 NoErrorsPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),
    // 自动将依赖注入html模板，并输出最终的html文件到目标文件夹
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
