/**
 * tzw 2018年2月9日13:30:09
 */
/*global module require process */
/*eslint no-console: "off" */
// 严格模式
'use strict'

// 引入配置文件（系统基础配置）
const config = require('../config/app.config')

const fs = require('fs')
const path = require('path')

const webpack = require('webpack')

// 打包前端代码
const webpack_client_config = require(`${config.CONFIG_ROOT}/webpack.pro.client.js`)
const client_compiler = webpack(webpack_client_config)
client_compiler.run((err, stats) => {
    // 开始制作index.html
    const renderHtml = require('./renderHtml')
    renderHtml()
        .then(res => {
            // 在config.WEBPACK_CLIENT_ROOT里生成index.html
            if(!fs.existsSync(config.WEBPACK_CLIENT_ROOT)) {
                fs.mkdirSync(config.WEBPACK_CLIENT_ROOT)
            }
            let index_writable = fs.createWriteStream(path.join(config.WEBPACK_CLIENT_ROOT, config.HTML_NAME))
            index_writable.write(res)
            console.log('客户端代码创建完毕！')
            process.exit()
        })
})
