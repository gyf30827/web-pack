//const _ = require('lodash');


var c = require('./second.css');
var l = require('./index.less');

//import React from 'react';

//var two = require('./second.js');

//var three = require('./three.js');

function component (src) {
    var element = document.createElement('img');
    element.src = src;
    element.className = l.bg
    element.onClick = function () {
        console.log(_);
    }
    return element;
}
document.body.appendChild(component(require('./img/map.ca45dc6.png')));

var button= document.createElement('button');
button.innerHTML = "案件是否啦";
document.body.appendChild(button);

document.body.onclick = function () {
     require.ensure([], function(require){
        var second =require('./second.js');
         console.log(second);
    });
}
console.log();

