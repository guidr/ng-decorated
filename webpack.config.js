var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'index.js',
        library: 'ng-decorated',
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
