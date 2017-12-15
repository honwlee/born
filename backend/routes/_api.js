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
    _(Object.keys(ctrls)).each(function(key) {
        let item = ctrls[key];
        _(["update", "create", "show", "delete", "index", "config", "select", "public"]).each(function(name) {
            if (item.module[name]) {
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
                    app.post('/api/' + key + '/' + name, ensureAuthenticated, upload.single('file'), function(req, res) {
                        item.module[name](req, res);
                    });
                } else {
                    app.get('/api/' + key + '/' + name, function(req, res) {
                        item.module[name](req, res);
                    });
                }

            }
        });
        if (item.extralNames) _(item.extralNames).each(function(ename) {
            if (item.module[ename]) {
                app.get('/api/' + key + '/' + ename, ensureAuthenticated, function(req, res) {
                    item.module[ename](req, res);
                });
            }

            if (item.extraPrefix) _(item.extraPrefix).each(function(prefix) {
                let pname = prefix.name + ename;
                if (item.module[pname]) {
                    if (prefix.method === "post") {
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
                        app.post('/api/' + key + '/' + pname, ensureAuthenticated, upload.single('file'), function(req, res) {
                            item.module[pname](req, res);
                        });
                    } else {
                        app.get('/api/' + key + '/' + pname, function(req, res) {
                            item.module[pname](req, res);
                        });
                    }
                }
            })
        });
    });

    app.get('/api/system/check', function(req, res) {
        res.json({ checked: User.delay(true, true) });
    });

    app.get('/api/auth/check', function(req, res) {
        if (req.isAuthenticated()) {
            res.json({ status: true, auth: true });
        } else {
            res.json({ status: false, auth: true });
        }
    });
};