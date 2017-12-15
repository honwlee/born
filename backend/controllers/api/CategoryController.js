'use strict';
const Category = require('../../models/Category').Category;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("categories", req, res, ["name"]);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let category = Category.findByReg(opt);
        if (category) {
            res.json(category);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let category = Category.update(req.body);
        res.json({ status: true, result: category });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Category, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Category.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Category.importData());
    }
}