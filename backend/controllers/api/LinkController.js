'use strict';
const Link = require('../../models/Link').Link;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("links", req, res, ["name"]);
    },

    select: function(req, res) {
        let links = Link.findAll({
            type: "main"
        });
        res.json(links);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let link = Link.findByReg(opt);
        if (link) {
            res.json(link);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let link = Link.update(req.body);
        res.json({ status: true, result: link });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Link, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Link.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Link.importData());
    }
}