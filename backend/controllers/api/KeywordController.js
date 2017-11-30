'use strict';
const Keyword = require('../../models/Keyword').Keyword;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("keywords", req, res, ["name"]);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let keyword = Keyword.findByReg(opt);
        if (keyword) {
            res.json(keyword);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let keyword = Keyword.update(req.body);
        res.json({ status: true, result: keyword });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Keyword, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Keyword.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Keyword.importData());
    }
}
