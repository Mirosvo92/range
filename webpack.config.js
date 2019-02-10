const path = require('path');

module.exports = function(env, args) {
    const prodMode = args.hasOwnProperty('production');

    return {
        mode: prodMode ? 'production' : 'development',
        entry: './dev/bubble-range.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            library: 'bubbleRange',
            filename: 'main.js',
            publicPath: 'dist/'
        },
        devtool: prodMode ?  false : 'source-map',
        devServer:{
            port: 3000
        },
    }
};