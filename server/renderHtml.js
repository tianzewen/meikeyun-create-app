/*global module require */
const config = require('../config/app.config.js')
const { Helmet } = require('react-helmet')
const fs = require('fs')
const path = require('path')

// 模板引擎
const Env = require('./middleware/nunjucksEnv')

module.exports = async (url) => {
    let stores = null, body = null, context = {}
    // 渲染body内容
    if (config.SSR) {
        // 引入翻译
        require('babel-register')(JSON.parse(fs.readFileSync('./.babelrc')))
        let result = require('./middleware/appBody')(url)
        stores = result.stores
        body = result.body
    }

    let manifest = {}
    if (config.DEBUG) {
        manifest = {
            'manifest.js': 'manifest.js',
            'vendor.js': 'vendor.js',
            'app.js': 'app.js',
            'app.css': 'app.css'
        }
    } else {
        const content = fs.readFileSync(path.join(config.WEBPACK_CLIENT_ROOT, 'manifest.json'), {encoding: 'utf-8'})
        manifest = JSON.parse(content)
    }
    // 如果进行了服务器端渲染 Helmet能获取到当前渲染页面中的title，meta，link等内容 具体实现机制我也不清楚
    const helmet = Helmet.renderStatic()
    // 用封装好的模板引擎函数引入模板就可以了
    return Env.render('index.html', {
        htmlAttributes: helmet.htmlAttributes.toString(),
        bodyAttributes: helmet.bodyAttributes.toString(),
        title: helmet.title.toString() || '魅客云',
        meta: helmet.meta.toString(),
        link: helmet.link.toString(),
        stores: stores,
        body: body,
        manifest: manifest
    })
}
