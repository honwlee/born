'use strict';
const gulp = require('gulp'),
    fs = require('fs'),
    copydir = require('copy-dir'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    gutil = require('gulp-util'),
    argv = require('yargs').argv,
    util = require('../utils'),
    apps = argv.apps,
    del = require('del'),
    header = require('gulp-header'),
    livereload = require('gulp-livereload'),
    sourceMaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    onError = require('../utils/handleErrors'),
    appsPath = path.join(util.frontend, "src/apps"),
    prod = !!gutil.env.prod;

function buildApp(name) {
    let appDist = path.join(util.frontend, "dist", name),
        commonLib = path.join(util.frontend, "lib"),
        commonSrvs = path.join(util.frontend, "src/services"),
        commonPlugins = path.join(util.frontend, "src/plugins"),
        commonHelpers = path.join(util.frontend, "src/helpers");

    if (fs.existsSync(appDist)) {
        del.sync([appDist + '/**/*'], {
            force: true
        });
    }
    let appPath = path.join(appsPath, name);
    if (fs.existsSync(appPath)) {
        // copydir.sync(appPath + "/src", appDist);
        gulp.src(appPath + "/src/**/*.js")
            .pipe(sourceMaps.init())
            .pipe(sourceMaps.write().on('error', onError))
            .pipe(prod ? uglify().on('error', onError) : gutil.noop())
            .pipe(header(util.banner, {
                pkg: util.pkg
            }))
            .pipe(gulp.dest(appDist));
        gulp.src(appPath + "/src/assets/**/*")
            .pipe(gulp.dest(appDist + "/assets"));
        gulp.src(appPath + '/src/**//*.+(html|hbs|handerbars)')
            .pipe(gulp.dest(appDist));
        gulp.src(appPath + '/src/**//*.json')
            .pipe(gulp.dest(appDist));
        gulp.src(appPath + '/src/**//*.+(png|jpg|jpeg|gif)')
            .pipe(gulp.dest(appDist));

        mkdirp.sync(path.join(appDist, "lib"));
        mkdirp.sync(path.join(appDist, "scripts/services"));
        mkdirp.sync(path.join(appDist, "scripts/helpers"));

        copydir.sync(commonLib, path.join(appDist, "lib"), function(stat, filepath, filename) {
            if (filename === ".DS_Store") return false;
            if (stat === 'directory' && filename.match(/^\./)) return false;
            return true;
        });
        gulp.src(commonSrvs + '/**/*')
            .pipe(sourceMaps.init())
            .pipe(sourceMaps.write().on('error', onError))
            .pipe(prod ? uglify().on('error', onError) : gutil.noop())
            .pipe(header(util.banner, {
                pkg: util.pkg
            }))
            .pipe(gulp.dest(path.join(appDist, "scripts/services")));

        gulp.src(commonHelpers + '/**//*.+(html|hbs|handerbars)')
            .pipe(gulp.dest(path.join(appDist, "scripts/helpers")));
        gulp.src(commonHelpers + '/**/*.js')
            .pipe(sourceMaps.init())
            .pipe(sourceMaps.write().on('error', onError))
            .pipe(prod ? uglify().on('error', onError) : gutil.noop())
            .pipe(header(util.banner, {
                pkg: util.pkg
            }))
            .pipe(gulp.dest(path.join(appDist, "scripts/helpers")));
        // copydir.sync(commonSrvs, path.join(appDist, "scripts/services"), function(stat, filepath, filename) {
        //     if (filename === ".DS_Store") return false;
        //     if (stat === 'directory' && filename.match(/^\./)) return false;
        //     return true;
        // });
        // copydir.sync(commonHelpers, path.join(appDist, "scripts/helpers"), function(stat, filepath, filename) {
        //     if (filename === ".DS_Store") return false;
        //     if (stat === 'directory' && filename.match(/^\./)) return false;
        //     return true;
        // });
    }
}

module.exports = function() {
    if (apps) {
        apps.forEach(name => {
            buildApp(name);
        });
    } else {
        fs.readdirSync(appsPath).forEach(item => {
            if (!item.match(/^\./)) {
                let stats = fs.statSync(path.join(appsPath, item));
                if (stats.isDirectory()) {
                    buildApp(item);
                }
            }
        });
    }
};