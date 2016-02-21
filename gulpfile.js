var gulp = require('gulp'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    del = require('del');

var SRC = 'src/',
    DIST = 'dist/';

var paths = {
    jade: SRC + '**/*.jade',
    js: SRC + '**/*.js',
    css: SRC + '**/*.css'
};

gulp.task('server', function () {
    connect.server({
        root: DIST,
        port: 8080,
        livereload: true
    });
});

gulp.task('clean', function () {
    return del([DIST + '**/*', '!' + DIST]);
});

gulp.task('watch-jade', function () {
    return gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(watch(paths.jade))
        .pipe(jade())
        .pipe(gulp.dest(DIST))
        .pipe(connect.reload());
});

gulp.task('watch-js', function () {
    return gulp.src(paths.js)
        .pipe(plumber())
        .pipe(watch(paths.js))
        .pipe(gulp.dest(DIST))
        .pipe(connect.reload());
});

gulp.task('watch-css', function () {
    return gulp.src(paths.css)
        .pipe(plumber())
        .pipe(watch(paths.css))
        .pipe(gulp.dest(DIST))
        .pipe(connect.reload());
});

gulp.task('dev', ['server', 'watch-jade', 'watch-js', 'watch-css']);
