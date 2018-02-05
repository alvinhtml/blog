
const webpack = require("webpack")
const path = require('path')

module.exports = {
    entry: {
        init: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux', 'redux-thunk', 'isomorphic-fetch'],
        bundle: './src/index.jsx',
    },
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
			loader: 'style!css!autoprefixer'
        }, {
            test: /\.less$/,
			loader: 'style!css?importLoaders=2!autoprefixer!less'
        }, {
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
        new webpack.optimize.CommonsChunkPlugin({
            name: 'init',
            filename: 'init.min.js',
        })
    ]
}

//importLoaders=2表明你在某个less文件中import进来的资源（其它的less文件）会被使用autoprefixer和less 这两个loader解析
