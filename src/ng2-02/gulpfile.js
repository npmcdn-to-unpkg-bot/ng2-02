/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    less = require("gulp-less"),
    flatten = require('gulp-flatten');;

var paths = {};
paths.webroot = "wwwroot/";
paths.npmSrc = "./node_modules/";
paths.npmLibs = paths.webroot + "lib/npmlibs/";

gulp.task("copy-assets-less", function () {
    return gulp.src('assets/styles/*.less')
      .pipe(less())
      .pipe(gulp.dest(paths.webroot + '/css'));
});

gulp.task("copy-assets-scripts", function () {
    return gulp.src('assets/scripts/*.js')
      .pipe(gulp.dest(paths.webroot + '/scripts'));
});

gulp.task("copy-all-js-min", function () {
    gulp.src(paths.npmSrc + '/**/*.min.js')
      .pipe(flatten())
      .pipe(gulp.dest(paths.webroot + '/scripts'));

    gulp.src(paths.npmSrc + '/systemjs/dist/*.*')
      .pipe(flatten())
      .pipe(gulp.dest(paths.webroot + '/scripts'));

    gulp.src(paths.npmSrc + '/**/*.min.map')
      .pipe(flatten())
      .pipe(gulp.dest(paths.webroot + '/scripts'));
});

gulp.task("copy-all-css-min", function () {
    gulp.src(paths.npmSrc + '/**/*.min.css')
      .pipe(flatten())
      .pipe(gulp.dest(paths.webroot + '/css'));
});

gulp.task("copy-startbootstrap", function () {
    gulp.src(paths.npmSrc + 'startbootstrap-sb-admin-2/dist/css/*.*')
      .pipe(flatten())
      .pipe(gulp.dest(paths.webroot + '/css'));

    gulp.src(paths.npmSrc + 'startbootstrap-sb-admin-2/dist/js/*.*')
      .pipe(flatten())
      .pipe(gulp.dest(paths.webroot + '/scripts'));

    gulp.src(paths.npmSrc + 'startbootstrap-sb-admin-2/bower_components/**/*.min.css')
        .pipe(flatten())
        .pipe(gulp.dest(paths.webroot + '/css'));

    gulp.src(paths.npmSrc + 'startbootstrap-sb-admin-2/bower_components/**/*.min.js')
      .pipe(flatten())
      .pipe(gulp.dest(paths.webroot + '/scripts'));

    gulp.src(paths.npmSrc + 'startbootstrap-sb-admin-2/bower_components/**/*-min.js')
      .pipe(flatten())
      .pipe(gulp.dest(paths.webroot + '/scripts'));

    gulp.src(paths.npmSrc + 'startbootstrap-sb-admin-2/bower_components/**/morris.css')
      .pipe(flatten())
      .pipe(gulp.dest(paths.webroot + '/css'));

    gulp.src(paths.npmSrc + 'startbootstrap-sb-admin-2/bower_components/font-awesome/fonts/*.*')
      .pipe(flatten())
      .pipe(gulp.dest(paths.webroot + '/fonts'));
});

gulp.task("copy-deps",
    [
        'copy-assets-less',
        'copy-assets-scripts',
        'copy-all-js-min',
        'copy-all-css-min',
        'copy-startbootstrap'
    ]);