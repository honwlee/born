'use strict';
const Content = require('../../models/Content').Content;
const parse = require('../../exts/parseList').parse;
const _ = require('lodash');
const Category = require('../../models/Category').Category;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("contents", req, res, ["name"]);
    },

    select: function(req, res) {
        let contents = Content.findAll({
            type: "main"
        });
        res.json(contents);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let content = Content.findByReg(opt);
        if (content) {
            res.json(content);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let content = Content.update(req.body);
        res.json({ status: true, result: content });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Content, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Content.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Content.importData());
    }
}
_(["home", "service", "process", "about"]).each(function(name) {
    let catName = "contents_" + name;
    module.exports[name] = function(req, res) {
        parse("contents", req, res, ["name"], {
            category: catName
        });
    };
    module.exports["post_" + name] = function(req, res) {
        let category = Category.findOrCreate("name", {
            name: catName,
            type: "contents",
            usage: 2
        });
        req.body.category = catName;
        req.body.file = req.file;
        validate(Content, { uniqName: req.body.name + "_" + catName }, req, res);
    };
    module.exports["public_" + name] = function(req, res) {
        console.log(catName);
        parse("contents", req, res, ["name"], {
            published: 'true',
            category: catName
        });
    };
});