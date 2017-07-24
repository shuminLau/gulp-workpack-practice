const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    cache: true,
    entry: {
        app: ['../src/main.js']
    },
    output: {
        publicPath: '/release/',
        path: __dirname + '/../release/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [__dirname + '/../src/'],
            use: 'babel-loader'
        }, {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                // 处理顺序 从右到左
                // ?importLoaders=1 表示 引入嵌入的 css文件也会按照postcss这样自动添加前缀
                // use: ['css-loader', 'postcss-loader', 'sass-loader']
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }, ]
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.vue'],
        alias: {

        }
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({ minimize: true }), //压缩和丑化
        new ExtractTextPlugin("css/styles.css"),
        //这个不添加allChunks参数的话，不会抽离chunk的css
        // new ExtractTextPlugin({ filename: 'css/[name].[hash:5].css', allChunks: true })
    ]
}