'use strict';

const webpack = require('webpack');
const AppPaths = require('./app-paths');
const path = require('path');


// Very basic config
// Does not include production optimisations
var webpackConfig = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: {
        app: path.join(AppPaths.source, 'main-app.js')
    },
    output: {
        path: AppPaths.build,
        filename: '[name]-bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less'],
                include: AppPaths.source
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                include: AppPaths.source
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};


if (process.env.NODE_ENV === 'production') {
    
    Array.prototype.push.apply(webpackConfig.plugins, [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false // Don't complain about things like removing unreachable code
            }
        })
    ]);
}


module.exports = webpackConfig;
