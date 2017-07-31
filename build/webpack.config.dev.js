const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    cache: true,
    entry: {
        app: ['../src/main.js']
    },
    output: {
        publicPath: './',
        path: __dirname + '/../release/',
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [{
                test: /\.(js)$/,
                include: [__dirname + '/../src'],
                loader: 'babel-loader'
            }, {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // 处理顺序 从右到左
                    use: ['css-loader?sourceMap=true', {
                            loader: 'postcss-loader',
                            options: {
                                config: { path: './postcss.config.js' },
                                sourceMap: true
                            }
                        },
                        'sass-loader?sourceMap=true'
                    ]
                })
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        }),
                        scss: ExtractTextPlugin.extract({
                            use: ['css-loader?sourceMap=true', {
                                    loader: 'postcss-loader',
                                    options: {
                                        config: { path: './postcss.config.js' },
                                        sourceMap: true
                                    }
                                },
                                'sass-loader?sourceMap=true'
                            ],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ]
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter'
    },
    resolve: {
        extensions: ['.js', '.es6', '.scss', '.vue'],
        alias: {
            '@': __dirname + '/../src'
        }
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({ minimize: true }), //压缩和丑化
        new ExtractTextPlugin("css/styles.css"),
        new webpack.DefinePlugin({
            // 'process.env': {
            //     NODE_ENV: 'production'
            // }
        }),
        // new BabiliPlugin({}, {
        //     comments: false,
        //     sourceMap: true
        // })
    ],
}