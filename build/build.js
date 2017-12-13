var  path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

//优化编译过程
var ora = require('ora');
const chalk = require('chalk');

//将编译完的 js文件 注入到指定的 html 模板
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 删除 dist 下的已有的文件
var CleanWebpackPlugin = require('clean-webpack-plugin');
//提出css单独打包
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var baseConfig = require('./webpack.config.base.js')
var config = require('./config.js');
var _default = require('./default&utils.js')._default;
var utils = require('./default&utils.js').utils;




process.env.NODE_ENV = 'production'


//Object.keys(baseConfig.entry).forEach(function (name) {
//    baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
//})

var buildConfig = merge(baseConfig,{
    output: {
        path: path.resolve(_default.root , config.outputPath), //打包后的文件存放的地方
        filename: utils.combine("js/[name].[chunkhash].js"),//打包后输出文件的文件名
        publicPath:config.publicPath   //webpack output is served from
    },
    module : {
        rules : [
            //把样式打包成单独文件通过 link 引入
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader?minimize=true&modules!postcss-loader!less-loader"
                })
            },
        ]
    },
    plugins : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
         //动态的注入静态资源
        new HtmlWebpackPlugin({
            filename:path.resolve(_default.root,config.outputPath,'index.html'),
            template:  path.resolve(_default.root,'index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }),
        //清除 dist 文件夹下的文件
        new CleanWebpackPlugin(
            [path.resolve(_default.root,config.outputPath)],
            {
                root: _default.root,
                verbose : false
            }
        ),

        //提出公共文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module,count) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        //单独打包css
        new ExtractTextPlugin(utils.combine('css/styles.css')),
    ]
})




const spinner = ora(chalk.cyan('start build...')).start();

webpack(buildConfig, function (err, status) {
    console.log('\n\n' + status.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n' )

    console.log(chalk.cyan('Build complete.\n'))
    spinner.stop()
})