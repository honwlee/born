'use strict';
const Photo = require('../../models/Photo').Photo;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("photos", req, res, ["name"]);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let photo = Photo.findByReg(opt);
        if (photo) {
            res.json(photo);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let photo = Photo.update(req.body);
        res.json({ status: true, result: photo });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Photo, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Photo.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Photo.importData());
    }
}
