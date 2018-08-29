/*global module require process */
// 引入配置文件（系统基础配置）
const config = require('../config/app.config')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const dirs = fs.readdirSync('./node_modules')
let externals = {}
dirs.forEach((item, index) => {
    externals[item] = item
})
externals['react-dom/server'] = 'react-dom/server'

module.exports = {
    entry: {
        app: path.join(config.CLIENT_ROOT, 'server_index.js'),
    },
    output: {
        path: config.WEBPACK_SERVER_ROOT,
        filename: 'app.js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.DefinePlugin({
            '__isServer__': true,
            '__isClient__': false
        })
    ],
    target: 'node',
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    babelrc: 'false',
                    presets: ['env', 'react', 'stage-0'],
                    plugins: ['transform-decorators-legacy']
                }
            },
            {
                test: /\.scss$/,
                loaders: 'css-loader/locals?modules&camelCase&importLoaders=1&localIdentName=[local]---[hash:base64:5]!sass-loader'
            },
            {
                test: /\.css$/,
                loaders: 'css-loader/locals?modules&camelCase&importLoaders=1&localIdentName=[local]---[hash:base64:5]'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ]
    },
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true
    },
    externals: externals
}
