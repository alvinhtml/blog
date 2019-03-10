//webpack

let path = require('path')
let MiniCssExtractPlugin = require('mini-css-extract-plugin') //抽离 css 文件，使用这个插件需要单独配置JS和CSS压缩
let UglifyJsPlugin = require('uglifyjs-webpack-plugin') //压缩JS
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') //压缩CSS
let webpack = require('webpack') //webpack 插件

module.exports = {

    optimization: { //优化项
        minimizer: [ //压缩优化
            new UglifyJsPlugin({
                cache: true, //缓存
                parallel: true, //并发打包
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },

    mode: 'development', //两种模式， production (生产模式) development（开发模式）

    entry: {
        //init: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux', 'redux-thunk', 'isomorphic-fetch'],
        bundle: './src/index.jsx'
        // index: './src/website.js',
    },

    devtool: 'source-map', //源码映射，生成一个映射文件，帮我们定位源码文件

    output: {
        filename: '[name].js',  //打包后的文件名
        path: path.resolve(__dirname, './public/js'), //路径必须是绝对路径
    },

    resolve: {
        modules: [path.resolve('node_modules')],
        extensions: ['.js', '.css', '.jsx'] //配置省略后缀名
    },

    module: { //模块

        rules: [ //规则
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,  //排除
                use: {
                    loader: 'babel-loader',
                    options: { //用 babel-loader 转化 ES6-ES5
                        presets: [ //这里是大插件集合
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [//这里可以配置一些小的插件
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|jpeg|bmp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100*1024,
                        outputPath: '/img',
                    }
                }
            }
        ]
    },

    watch: true,
    watchOptions: {
        poll: 2000, //每秒问我多少次
        aggregateTimeout: 2000, //防抖
        ignored: /node_modules/
    },

    plugins: [ //数组，放着所有 webpack 插件
        new MiniCssExtractPlugin({
            filename: '../css/style.min.css'
        }),

        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'),
        }),

    ],

    devServer: {
        port: 3000,
        progress: true, //进度条
        contentBase: './build', //配置目录
        open: true, //在DevServer第一次构建完成时，自动用浏览器打开网页
    }
}
