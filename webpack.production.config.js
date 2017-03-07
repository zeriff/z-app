var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: './client/index.js',
    output: {
        path: './public/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            },
            minimize: true,
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel'],
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        extenstions: ['', '.js', '.jsx', '.css']
    }
}
