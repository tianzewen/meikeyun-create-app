/**
 * tzw 2017年8月29日14:32:23
 */
/*global module require */
/*eslint no-console: "off" */
// 严格模式
'use strict'

// 引入配置文件（系统基础配置）
const config = require('../config/app.config')

// Koa框架
const Koa = require('koa')

// Koa实例化出来一个application
const app = new Koa()

const webpack = require('webpack')
const {devMiddleware, hotMiddleware}  = require('koa-webpack-middleware')

// 打包前端代码
const webpack_client_config = config.DEBUG ? require(`${config.CONFIG_ROOT}/webpack.dev.client.js`) : require(`${config.CONFIG_ROOT}/webpack.pro.client.js`)
const client_compiler = webpack(webpack_client_config)


if (config.DEBUG) {
    // 热部署
    app.use(devMiddleware(client_compiler, {
        noInfo: true,
        publicPath: '/'
    }))
    app.use(hotMiddleware(client_compiler))
} else {
    client_compiler.run((err, stats) => {console.log('客户端代码打包完毕！')})
}

// 静态资源服务器
app.use(require('koa-static')(config.WEBPACK_CLIENT_ROOT))

// 定义路由
let router
// 服务器端渲染模式下的路由 || 无服务器端渲染的路由
if (config.SSR) {
    router = async (ctx, next) => {
        console.log(`请求网址：${  ctx.request.url}`)

        const fs = require('fs')

        // 加载scss文件的钩子
        require('css-modules-require-hook')({
            extensions: ['.scss'],
            preprocessCss: (data, filename) =>
                require('node-sass').renderSync({
                    data,
                    file: filename
                }).css,
            camelCase: true,
            generateScopedName: '[local]---[hash:base64:5]'
        })

        // 加载css文件的钩子
        require('css-modules-require-hook')({
            extensions: ['.css'],
            camelCase: true,
            generateScopedName: '[local]---[hash:base64:5]'
        })

        // 加载图片的钩子
        require('asset-require-hook')({
            extensions: ['jpg', 'png', 'gif', 'webp'],
            limit: 8192,
            generateScopedName: 'images/[hash:8].[name].[ext]'
        })

        const renderHtml = require('./renderHtml')

        ctx.response.type = 'html'
        // 返回页面
        renderHtml(ctx.request.url)
            .then(res => {
                ctx.response.body = res
            })
    }
} else {
    router = async (ctx, next) => {
        console.log(`请求网址：${  ctx.request.url}`)

        const fs = require('fs')

        // 引入babel热
        require('babel-register')(JSON.parse(fs.readFileSync('./.babelrc')))

        const renderHtml = require('./renderHtml')

        ctx.response.type = 'html'
        // 返回页面
        renderHtml(ctx.request.url)
            .then(res => {
                ctx.response.body = res
            })
    }
}
app.use(router)

// 监听端口
app.listen(config.PORT, () => {
    console.log(`正在监听端口：${config.PORT}`)
})
