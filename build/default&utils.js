var path = require('path')
var config = require('./config.js');


var  _default = {
    root : path.resolve(__dirname,'../'),
    src : path.resolve(__dirname,'../src'),
    index : path.resolve(__dirname,'../src/app/index.js'),

}



var utils = {
    //合并静态资源的文件目录
    combine : function (src) {
        return path.join(config.resourceName || 'static', src);
    }
}

module.exports = {
    _default : _default,
    utils : utils
}