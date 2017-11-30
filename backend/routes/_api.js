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
    multer = require('multer');

module.exports = function(app, router, ensureAuthenticated, rootPath) {
    // api
    Object.keys(ctrls).forEach(function(key) {
        ["update", "create", "show", "delete", "index"].forEach(function(name) {
            let item = ctrls[key];
            let action;
            let matcher = name.match(/^(show|index)/)
            if (matcher) {
                action = matcher[0];
                app.get('/api/' + key + '/' + name, function(req, res) {
                    item.module[action](req, res);
                });
            } else {
                action = name;
                if (item.uploadPath) {
                    let storage = multer.diskStorage({
                            destination: function(req, file, cb) {
                                let _p = path.join(rootPath, 'assets/images/upload', item.uploadPath);
                                if (!fs.existsSync(_p)) mkdirp(_p);
                                cb(null, _p);
                            },
                            filename: function(req, file, cb) {
                                cb(null, Date.now() + "-" + file.originalname);
                            }
                        }),
                        upload = multer({ storage: storage });
                    app.post('/api/' + key + '/' + name, ensureAuthenticated, upload.single('file'), function(req, res) {
                        item.module[action](req, res);
                    });
                } else {
                    app.post('/api/' + key + '/' + name, ensureAuthenticated, function(req, res) {
                        item.module[action](req, res);
                    });
                }
            }
        });
    });

    app.get('/api/auth/check', function(req, res) {
        if (req.isAuthenticated()) {
            res.json({ status: true, auth: true });
        } else {
            res.json({ status: false, auth: true });
        }
    });
};
