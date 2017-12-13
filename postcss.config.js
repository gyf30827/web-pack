
var Autoprefixer = require('autoprefixer')
module.exports = {
    plugins: [
        Autoprefixer({
            browsers: ['ie>=8','>1% in CN']
        })
    ]
}