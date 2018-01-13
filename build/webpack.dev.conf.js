'use strict'
// 引入当前目录中的utils工具配置文件
// 请自行查看我博客中的utils.js的相关文章
const utils = require('./utils')
// 引入webpack来使用webpack内置插件
const webpack = require('webpack')//核心编译工具
// 引入config目录中的index.js配置文件
const config = require('../config')
// 引入webpack-merge插件用来合并webpack配置对象，也就是说可以把webpack配置文件拆分成几个小的模块，然后合并
const merge = require('webpack-merge')
const path = require('path')
// 引入当前目录下的webpack.base.conf.js配置文件，主要配置的是打包各种文件类型的配置
// 请自行查看我博客的相关文章
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 下面是一个自动生成html的插件，能够把资源自动加载到html文件中
// 详情请看 (1)
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 下面这个插件是用来把webpack的错误和日志收集起来，漂亮的展示给用户
// 详情请看 (2)
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// shimingxin
const express = require('express')
const app = express()//请求server
var appData = require('../data.json')//加载本地数据文件
var seller = appData.seller//获取对应的本地数据
var goods = appData.goods
var ratings = appData.ratings
// 路由
var apiRoutes = express.Router()
app.use('/api', apiRoutes)//通过路由请求数据

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    //第二步找到devServer,在里面添加
    before (app) {
      app.get('/api/seller', (req, res) => {
        res.json({
          errno: 0,// 数据正常的标识，还会有其他表示，权限设置等
          data: seller
        })//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
      }),
        app.get('/api/goods', (req, res) => {
          res.json({
            errno: 0,
            data: goods
          })
        }),
        app.get('/api/ratings', (req, res) => {
          res.json({
            errno: 0,
            data: ratings
          })
        })
    }
  },
  plugins: [
    // DefinePlugin内置webpack插件，专门用来定义全局变量的，下面定义一个全局变量 process.env 并且值是如下
    /*  'process.env': {
            NODE_ENV: '"development"'
        } 这样的形式会被自动转为
        'process.env': '"development"'
        各位骚年看好了，development如果不加双引号就当做变量处理，程序会报错
    */
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // 下面这个插件HotModuleReplacementPlugin可以说是博大精深没有几个人弄透的，包括我在内，
    // 详情见(3)
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // 下面这个插件比较简单，就是当webpack编译错误的时候，来中断打包进程，防止错误代码打包到文件中，你还不知道
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({//
      filename: 'index.html',
      template: 'index.html',
      inject: true//打包css js
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
