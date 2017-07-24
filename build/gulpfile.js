const gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    open = require('opn'),
    Webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    WebpackDevConfig = require('./webpack.config.dev');

gulp.task('concat-lib', function() {
    return gulp.src([
            'vue/dist/vue.min.js',
            'vue-router/dist/vue-router.min.js'
        ], {
            cwd: '../lib'
        })
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('../release/'));
});

gulp.task('index', function() {
    return gulp.src('../src/index.html')
        .pipe(gulp.dest('../release'));
})

gulp.task('webpack-dev', ['concat-lib'], function() {
    var config = Object.create(WebpackDevConfig);
    // 热替换设置
    //这两项配置原本是在webpack.config.dev.js里边配置，可是通过gulp启动devserver，那种配置无效，只能在此处写入
    //官网的解释是webpack-dev-server没有权限读取webpack的配置
    config.entry.app.unshift("webpack-dev-server/client?http://localhost:3000/", "webpack/hot/dev-server");
    config.plugins.push(new Webpack.HotModuleReplacementPlugin());

    const compiler = Webpack(config);
    const server = new WebpackDevServer(compiler, {
        contentBase: "../",
        publicPath: "/release/",
        hot: true,
        compress: false,
        stats: { colors: true }
    });
    server.listen(3000, "localhost", function() {});
})

gulp.task('browser', ['webpack-dev', 'index'], function() {
    open('http://localhost:3000');
})

gulp.task('default', ['webpack-dev', 'browser']);