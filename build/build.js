'use strict'
require('./check-versions')() // 检查 Node 和 npm 版本

process.env.NODE_ENV = 'production'

const ora = require('ora') // 一个很好看的 loading 插件
const rm = require('rimraf') // rm，用于删除文件或文件夹的插件
const path = require('path') // 使用 NodeJS 自带的文件路径工具
const chalk = require('chalk') // chalk，用于在控制台输出带颜色字体的插件
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf') // 线上webpack配置文件

const spinner = ora('CRM正在打包，老板请先出去抽支烟') //使用 ora 打印
spinner.start()// 开始 loading 动画

// 首先将整个dist文件夹以及里面的内容删除，以免遗留旧的没用的文件,删除完毕的回调里，再开始webpack编译
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err

  // 拼接成功后，在回调里，开始webpack编译！
  webpack(webpackConfig, function (err, stats) {

   /**
    * webpack编译成功的回调函数
    */

    spinner.stop() // 停止 loading 动画
    if (err) throw err
    // 以下为npm提示
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  构建失败，意外的发生了错误.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('CRM构建完成，恭喜老板，.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })


})
