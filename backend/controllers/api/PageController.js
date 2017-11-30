'use strict';
const Page = require('../../models/Page').Page;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("pages", req, res, ["name"]);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let page = Page.findByReg(opt);
        if (page) {
            res.json(page);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let page = Page.update(req.body);
        res.json({ status: true, result: page });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Page, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Page.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Page.importData());
    }
}
