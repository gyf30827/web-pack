const _ = require('lodash');

var s = require('./second.js');

s.log('你好呀');

function component(src) {
    var element = document.createElement('img');
    element.src = src;
    return element;
}
document.body.appendChild(component(require('./img/map.ca45dc6.png')));

//# sourceMappingURL=index-compiled.js.map