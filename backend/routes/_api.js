'use strict';
const ctrls = require("../controllers/api/controllers"),
    path = require("path"),
    fs = require('fs'),
    dbpath = path.join(__dirname, "../dbs"),
    jsonServer = require('../lib/restsrv/'),
    plural = require('../lib/restsrv/router/plural'),
    nested = require('../lib/restsrv/router/nested'),
    dbms = require('../lib/dbms/'),
    jsondb = dbms(dbpath, {
        master_file_name: "master.json"
    }),
    mkdirp = require('mkdirp'),
    _ = require('lodash'),
    User = require('../models/User').User,
    multer = require('multer');

module.exports = function(app, router, ensureAuthenticated, rootPath) {
    if (!fs.existsSync(rootPath)) mkdirp(rootPath);
    // api
    Object.keys(ctrls).forEach(function(key) {
        ["update", "create", "show", "delete", "index", "config", "select", "public"].forEach(function(name) {
            let item = ctrls[key];
            let matcher = name.match(/^(update|create|delete)/)
            if (matcher) {
                let storage = multer.diskStorage({
                        destination: function(req, file, cb) {
                            let _p = path.join(rootPath, 'upload', item.uploadPath || "");
                            if (!fs.existsSync(_p)) mkdirp.sync(_p);
                            cb(null, _p);
                        },
                        filename: function(req, file, cb) {
                            cb(null, Date.now() + "-" + file.originalname);
                        }
                    }),
                    upload = multer({ storage: storage });
                if (item.module[name]) {
                    app.post('/api/' + key + '/' + name, ensureAuthenticated, upload.single('file'), function(req, res) {
                        item.module[name](req, res);
                    });
                }
            } else {
                if (item.module[name]) {
                    app.get('/api/' + key + '/' + name, function(req, res) {
                        item.module[name](req, res);
                    });
                }

            }
        });
    });

    app.get('/api/system/check', function(req, res) {
        res.json({ checked: User.delay(true, true) });
    });
};