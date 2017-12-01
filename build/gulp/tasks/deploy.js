const electron = require('electron');
const del = require('del');
const zipper = require("zip-local");
const fs = require('fs');
const proc = require('child_process');
const path = require('path');
const mkdirp = require('mkdirp');
const asar = require('asar');
const util = require('../utils');
const deployPath = path.join(util.frontend, "deploy");
const argv = require('yargs').argv;
const apps = argv.apps;
const distPath = path.join(util.frontend, "dist");

function ensureAppDir(slaxAppDir) {
    if (fs.existsSync(slaxAppDir)) {
        del.sync([slaxAppDir + '/**/*'], {
            force: true
        });
        fs.rmdirSync(slaxAppDir);
    }
    mkdirp.sync(islaxAppDir);
}

var extractSlaxFile = function(slaxFileName, slaxAppDir) {

    try {
        ensureAppDir();
        zipper.sync.unzip(slaxFileName).save(slaxAppDir);
    } catch (e) {
        console.log("The slax file is not a zipped file? extract as a asar file", e);
        ensureAppDir();

        asar.extractAll(slaxFileName, slaxAppDir);
    }
};

function pack(slaxAppDir, slaxFileName) {
    console.log(slaxAppDir);
    zipper.sync.zip(slaxAppDir).compress().save(slaxFileName);
}

function unpack(slaxFileName, slaxAppDir) {

    try {
        ensureAppDir(slaxAppDir);
        zipper.sync.unzip(slaxFileName).save(slaxAppDir);
    } catch (e) {
        console.log("The slax file is not a zipped file? extract as a asar file", e);
        ensureAppDir(slaxAppDir);

        asar.extractAll(slaxFileName, slaxAppDir);
    }
}

function deployApp(name) {
    let slaxPath = path.join(deployPath, name + ".slax");
    if (fs.existsSync(slaxPath)) {
        del.sync([slaxPath + '/**/*'], {
            force: true
        });
    }

    pack(path.join(distPath, name), slaxPath, function(err) {
        if (err) {
            console.error(error.stack)
            process.exit(1)
        }
    });
    // unpack(slaxPath, path.join(distPath, "test", name));
}

module.exports = function() {
    if (apps) {
        apps.forEach(name => {
            deployApp(name);
        });
    } else {
        fs.readdirSync(distPath).forEach(item => {
            if (!item.match(/^\./)) {
                let stats = fs.statSync(path.join(distPath, item));
                if (stats.isDirectory()) {
                    deployApp(item);
                }
            }
        });
    }
}