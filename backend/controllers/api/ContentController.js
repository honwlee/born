'use strict';
const Content = require('../../models/Content').Content;
const parse = require('../../exts/parseList').parse;
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