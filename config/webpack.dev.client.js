/*global module require process */
// 引入配置文件（系统基础配置）
const config = require('../config/app.config')
const webpack = require('webpack')
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
// 样式与JS分离
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: path.join(config.CLIENT_ROOT, 'client_index.js'),
        vendor: [
            'webpack-hot-middleware/client?noInfo=true&reload=true',
            'react',
            'react-dom',
            'react-router-dom',
            'react-helmet',
            'mobx',
            'mobx-react',
        ]
    },
    devtool: 'cheap-module-source-map',
    output: {
        pathinfo: true,
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract('css-loader?modules&localIdentName=[local]---[hash:base64:5]!sass-loader')
            },
            // 添加对样式表的处理 感叹号（!）的作用在于使同一文件能够使用不同类型的loader
            // loaders解析的时候是从右往左的，例如：css-loader!sass-loader就是先用sass分析，然后再用css分析
            {
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract('css-loader?modules&localIdentName=[local]---[hash:base64:5]')
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ]
    },
    plugins: [
    // 热更新
        new webpack.HotModuleReplacementPlugin(),
        // 它的作用：跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
        new webpack.NoEmitOnErrorsPlugin(),
        // module的名称
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                DEV: true,
                BROWSER: true
            },
            '__isServer__': false,
            '__isClient__': true
        }),
        // 声明打包的文件哪些是依赖或是公用部分
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].js'
        }),
        // 打包时显示进度
        new webpack.ProgressPlugin(function(percentage, msg) {
            let str = `${Math.floor(percentage * 100)  }% ${  msg}`
            process.stderr.write(`${str  }\r`)
        }),
        // css单独打包成文件
        new ExtractTextPlugin('[name].css'),
        new ManifestPlugin()
    ],
}
