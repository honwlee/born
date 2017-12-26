'use strict';

const gutil = require('gulp-util'),
    fs = require('fs'),
    util = require('../utils'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    argv = require('yargs').argv,
    apps = argv.apps,
    sass = require('gulp-sass'),
    appsPath = path.join(util.frontend, "src/apps");

function buildSass(name) {
    let dist = path.join(appsPath, name + '/src/assets/stylesheets'),
        src = path.join(dist, 'sass/**/*.scss');
    console.log(dist);
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist));
    // .pipe(rename("main.min.css"))
}
module.exports = function() {
    if (apps) {
        apps.forEach(name => {
            buildSass(name);
        });
    } else {
        fs.readdirSync(appsPath).forEach(item => {
            if (!item.match(/^\./)) {
                let stats = fs.statSync(path.join(appsPath, item));
                if (stats.isDirectory()) {
                    buildSass(item);
                }
            }
        });
    }
};