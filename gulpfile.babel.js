'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const uglify = require('gulp-uglifyjs');
const clean = require('gulp-clean');
const rename = require('gulp-rename');

const dirs = {
    src: './src',
    dest: './dist'
};

const paths = {
    js:`${dirs.src}/*.js`,
    dest: `${dirs.dest}/`
};

gulp.task('clean-scripts', ()=>{
    return gulp.src(`${paths.dest}/*.js`)
        .pipe(clean({force:true}))
});

gulp.task("lint", ['clean-scripts'], function() {
    return gulp.src(paths.js)
        .pipe(jshint({
            esversion:6,
            eqeqeq: true,
            freeze: true,
            futurehostile: true,
            strict:true,
            latedef:true,
            //undef: true,
            //unused: true,
            notypeof: true,
            jquery: true,
            node:true
        }))
        .pipe(jshint.reporter(stylish))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', () => {
    return gulp.watch(paths.js, ["lint"]);
});

gulp.task('uglify', () => {
    return gulp.src([`${paths.dest}**/*.js`, `!${paths.dest}**/*.min.js`])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('default', ['lint'], ()=>{
    return gulp.start('watch');
});

gulp.task('dist', ['lint'], ()=>{
    gulp.start('uglify');
});

