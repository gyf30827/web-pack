
const _ = require('lodash');

console.log('第三个模块');
module .exports = {
    log: function (text) {
        console.log(text || '第三个模块')
    }
}