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
    appsPath = path.join(util.frontend, "src/apps");

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
        copydir.sync(appPath, appDist);
        mkdirp(path.join(appDist, "lib"));
        mkdirp(path.join(appDist, "scripts/services"));
        mkdirp(path.join(appDist, "scripts/helpers"));
        copydir.sync(commonLib, path.join(appDist, "lib"), function(stat, filepath, filename) {
            if (filename === ".DS_Store") return false;
            if (stat === 'directory' && filename.match(/^\./)) return false;
            return true;
        });
        copydir.sync(commonSrvs, path.join(appDist, "scripts/services"), function(stat, filepath, filename) {
            if (filename === ".DS_Store") return false;
            if (stat === 'directory' && filename.match(/^\./)) return false;
            return true;
        });
        copydir.sync(commonHelpers, path.join(appDist, "scripts/helpers"), function(stat, filepath, filename) {
            if (filename === ".DS_Store") return false;
            if (stat === 'directory' && filename.match(/^\./)) return false;
            return true;
        });
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
