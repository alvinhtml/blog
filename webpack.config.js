
const webpack = require("webpack")
const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
    entry: {
        init: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux', 'redux-thunk', 'isomorphic-fetch'],
        bundle: './src/index.jsx',
        //index: './src/website.js',
    },
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader"
                }]
            })
        },{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader"
                },{
                    loader: "less-loader"
                }]
            })
        },{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.(png|jpg|gif|eot|woff|svg|ttf|woff2)$/,
			loader: 'url-loader?limit=30000'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'init',
        //     filename: 'init.min.js',
        // }),
        new ExtractTextPlugin({
            filename: '../css/style.min.css'
        })
    ]
}

//importLoaders=2表明你在某个less文件中import进来的资源（其它的less文件）会被使用autoprefixer和less 这两个loader解析
