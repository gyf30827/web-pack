var path = require('path');
var express = require('express');
var webpack = require('webpack');
var merge = require('webpack-merge');
var opn = require('opn');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var baseConfig = require('./webpack.config.base.js');
var config = require('./config.js');
var _default = require('./default&utils.js')._default;
var utils = require('./default&utils.js').utils;

var url = 'http://'+ (config.url || '10.10.1.164') +':' + (config.port || 8080)

Object.keys(baseConfig.entry).forEach(function (name) {
    baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
})

var developConfig = merge(baseConfig,{
    module : {
        rules : [
            // 以 style 的形式 把 样式添加到 页面上
            {
                test: /\.(css|less)$/,
                use:[
                    'style-loader','css-loader?minimize=true&modules','postcss-loader',"less-loader"
                ]
            }
        ]
    },
    plugins : [
        // 动态的注入静态资源
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
})
var app = express(developConfig);
var compiler = webpack(developConfig);
app.use(require('webpack-dev-middleware')(compiler,{
    // publicPath:config.webpackConfig.output.publicPath,
    quiet:true,
    noInfo:true,
    reload:true,
    stats:{colors:true}
}));
app.use(require('webpack-hot-middleware')(compiler,{
    log:console.log
}));
//app.use('static', express.static(path.join(config.appSrcPath,'external')));
app.get('*', function(req,res){
    res.sendFile(path.join(_default.root,'/index.html'));
});
app.listen(config.port,function(err) {
    if (err) {
        return;
    }
    opn(url)
    console.log('Listening at ' +  url);
});
