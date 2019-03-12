/**
 * 本项目的主要配置 （webpack只是子集）
 */
'use strict'

const path = require('path')

module.exports = {
  // production 环境使用的配置
  build: {
    env: require('./prod.env'),// '"production"'
    index: path.resolve(__dirname, '../dist/index.html'),// 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源根路径
    assetsSubDirectory: './static',// 编译输出的二级目录名称
    assetsPublicPath: './',// 编译发布上线路径的根目录
    productionSourceMap: true,
    productionGzip: false, // 是否开启 gzip
    productionGzipExtensions: ['js', 'css'],// 需要使用 gzip 压缩的文件扩展名
    bundleAnalyzerReport: process.env.npm_config_report,
  },
  // dev 环境环境使用的配置
  dev: {
    env: require('./dev.env'), // '"development"'
    port: process.env.PORT || 8888,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //解决跨域的问题
      '/api': {
        target: 'http://192.168.188.116:81',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // 是否开启 cssSourceMap
    cssSourceMap: false
  }
}
