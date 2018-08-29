/**
 * 配置文件（非常重要，很多地方会引用当前文件）
 * tzw 2017年5月22日13:57:44
 */
/*global module require */
const path = require('path')
const app_root = path.join(__dirname, '../')

module.exports = {
    // 项目根目录
    APP_ROOT: app_root,
    // 为React App生成的html名称 直接访问该文件时 SSR失效
    HTML_NAME: 'mky_index.html',
    // 项目配置文件夹
    CONFIG_ROOT: path.join(app_root, 'config'),
    // 前端入口文件
    CLIENT_ROOT: path.join(app_root, 'client'),
    // 模板文件夹
    TMP_ROOT: path.join(app_root, 'server', 'tmp'),
    // 打包前端代码（前端使用）
    WEBPACK_CLIENT_ROOT: path.join(app_root, 'webpack_client'),
    // 打包前端代码（后端使用）
    WEBPACK_SERVER_ROOT: path.join(app_root, 'webpack_server'),
    // 端口
    PORT: 3005,
    // 是否是调试模式
    DEBUG: true,
    // 是否开启服务器端渲染
    SSR: false,
}
