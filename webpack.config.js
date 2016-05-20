/**
 * READ THIS
 * http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6
 *
 * EXAMPLE
 * https://github.com/MikeRyan52/angular-decorators
 */

var path = require('path');

module.exports = {
    // devtool : 'source-map',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        library: 'ng-decorators',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test : /\.js$/,
                loader : 'babel',
                exclude : [
                    path.resolve(__dirname, 'node_modules')
                ],
                query : {
                    presets : ['es2015', 'stage-0']
                }
            }
        ]
    }
};
