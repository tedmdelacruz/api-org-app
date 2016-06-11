'use strict';

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var notify = require('gulp-notify');

var paths = {
    scss: 'static/css/styles.scss',
    redux: 'static/js/src/app.js',
    bower: 'bower_components',
    dest: 'static',
};

gulp.task('scss', function () {
    var source = gulp.src(paths.scss);
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(notify('Successfully compiled Sass'))
        .pipe(gulp.dest(paths.dest + '/css'));
});

gulp.task('scss:watch', function () {
    return gulp.watch(paths.scss, ['scss']);
});

function compile(isWatch) {
    var bundler = watchify(browserify(paths.redux, { debug: true }))
        .transform(babelify);

    function rebundle() {
        bundler.bundle()
            .on('error', function (error) {
                console.error(error);
                this.emit('end');
            })
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(gulp.dest(paths.dest + '/js/dist'))
            .pipe(notify('Successfully compiled JS'))
    }

    if (isWatch) {
        bundler.on('update', function () {
            return rebundle();
        });
    }

    return rebundle();
}

gulp.task('js', function () {
    return compile();
});

gulp.task('js:watch', function () {
    return compile(true);
});

// TODO Refactor me
gulp.task('copy', function () {
    gulp.src(paths.bower + '/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest(paths.dest + '/css'));
    gulp.src(paths.bower + '/bootstrap/dist/fonts/*')
        .pipe(gulp.dest(paths.dest + '/fonts'));

    gulp.src(paths.bower + '/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest(paths.dest + '/css'));

    gulp.src(paths.bower + '/font-awesome/fonts/*')
        .pipe(gulp.dest(paths.dest + '/fonts'));

    gulp.src(paths.bower + '/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest(paths.dest + '/js/dist'));
    gulp.src(paths.bower + '/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(paths.dest + '/js/dist'));
});

gulp.task('watch', ['scss:watch', 'js:watch']);

gulp.task('default', ['scss', 'js', 'copy']);
