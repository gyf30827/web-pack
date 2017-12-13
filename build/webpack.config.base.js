var  path = require('path');
var webpack = require('webpack');

var config = require('./config.js');
var _default = require('./default&utils.js')._default;
var utils = require('./default&utils.js').utils;
 module.exports = {
    entry : {
        app :["babel-polyfill",_default.index]
    },
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        filename: "[name].js",//打包后输出文件的文件名
        //publicPath:"/dist/"   //webpack output is served from
    },
    resolve: {
        extensions: ['.js', '.vue', '.json','.css'],//自动解析确定的扩展
        alias: {},//别名
        symlinks: false
    },
    module : {
        rules : [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024*8,
                            name : utils.combine('img/[name].[hash].[ext]')
                        }
                    }
                ]
            }
        ]
    },
    plugins : []
}