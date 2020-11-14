const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

const { runInContext } = require('vm')

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build/')
    },

    devServer: {
        publicPath: '/build/',
        proxy: [{

            context: '/api/leaders',
            target: 'http://localhost:3000/'

        }]
    },



    module: {

        rules: [
            {
                test: /\.jsx?/,
                exclude: /(node_modules)/,

                // query: {
                //     presets: ['es2015']
                // },
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    //   'sass-loader',
                ],
            },

            {
                test: /\.(jpg|jpeg|png)$/,
                use: {
                    loader: 'url-loader'
                }
            },

        ]

    }
}