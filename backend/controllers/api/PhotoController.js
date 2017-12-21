'use strict';
const Photo = require('../../models/Photo').Photo;
const parse = require('../../exts/parseList').parse;
const _ = require('lodash');
const Category = require('../../models/Category').Category;
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
        parse("photos", req, res, ["name"], {
            published: 'true'
        });
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

_(["slide", "page", "content"]).each(function(name) {
    let catName = "photos_" + name;
    module.exports[name] = function(req, res) {
        parse("photos", req, res, ["name"], {
            category: catName
        });
    };
    module.exports["post_" + name] = function(req, res) {
        let category = Category.findOrCreate("name", {
            name: catName,
            type: "photos",
            usage: 2
        });
        req.body.category = catName;
        req.body.file = req.file;
        validate(Photo, { uniqName: req.body.name + "_" + catName }, req, res);
    };
    module.exports["public_" + name] = function(req, res) {
        parse("photos", req, res, ["name"], {
            published: 'true',
            category: catName
        });
    };
});