'use strict';

var config= require('./config.js');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
gulp.task('sass',function(){
    gulp.src(config.src.style)
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(concat(config.dist.style.name))
        //.pipe(gulp.dest(config.dist.style.path))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dist.style.path))
        .pipe(reload({stream: true}))
});
gulp.task('js',function(){
    gulp.src(config.src.scripts)
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(browserify({
           "transform": ["babelify"],
            "debug" : false
         }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(config.dist.scripts.path))
        .pipe(reload({stream: true}))
});
gulp.task('html',function(){
    gulp.src(config.src.html)
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest(config.dist.html))
        .pipe(reload({stream: true}))
});

gulp.task('copy',function(){
    gulp.src(config.src.copy[0])
    .pipe(gulp.dest(config.dist.copy[0]))
    gulp.src(config.src.copy[1])
    .pipe(gulp.dest(config.dist.copy[1]))
})

gulp.task('default',['copy'],function(){
    browserSync.init({
        server: "dist/",
        port: "4000",
        open: false
    });
    gulp.watch(config.watch.scripts,['js']);
    gulp.watch(config.watch.style,['sass']);
    gulp.watch(config.watch.html,['html']);
});