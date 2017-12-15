'use strict';
const Photo = require('../../models/Photo').Photo;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("photos", req, res, ["name"]);
    },

    select: function(req, res) {
        // let opt = {};
        // if (!req.query.key) return res.json({});
        // opt[req.query.key] = req.query.value;
        // let photos = Page.findAll(opt);
        // res.json(photos);
        parse("photos", req, res, ["name"]);
    },

    public: function(req, res) {
        let result = parse("photos", req, res, ["name"], true);
        res.json({
            total: result.total,
            rows: result.rows.filter(function(s) {
                return s.published;
            }).value()
        })
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