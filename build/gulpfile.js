const gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    open = require('opn'),
    Webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    WebpackDevConfig = require('./webpack.config.dev');

gulp.task('clean', function() {
    return gulp.src('../release/*', { read: false })
        .pipe(clean({ force: true }))
})

gulp.task('concat-lib', ['clean'], function() {
    return gulp.src([
            'vue/dist/vue.min.js',
            'vue-router/dist/vue-router.min.js',
        ], {
            cwd: '../lib'
        })
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('../release/js'));
});

gulp.task('index', ['clean'], function() {
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
        contentBase: "../release/",
        publicPath: "/",
        hot: true,
        compress: false,
        stats: { colors: true },
        // 防止浏览器刷新后找不到页面（单页面路由）
        // historyApiFallback: true
    });
    server.listen(3000, "localhost", function() {});
})

gulp.task('browser', ['webpack-dev', 'index'], function() {
    open('http://localhost:3000/');
})

gulp.task('webpack-build', ['concat-lib', 'index', 'clean'], function() {
    let config = Object.create(WebpackDevConfig);
    Webpack(config, function(err, stats) {
        if (err)
            throw new gutil.PluginError('Webpack', err);
        gutil.log("[webpack]", stats.toString({}));
    })
})

gulp.task('default', ['webpack-dev', 'browser']);

gulp.task('build', ['webpack-build']);