'use strict';
const Page = require('../../models/Page').Page;
const Slide = require('../../models/Slide').Slide;
const parse = require('../../exts/parseList').parse;
const pageExt = require("../../exts/page");
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("pages", req, res, ["name"]);
    },
    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let page = Page.findByReg(opt)[0];
        let slides = Slide.findAll({
            page: page.name
        });
        if (page) {
            res.json({
                page: page,
                slide: slides.map(function(s) {
                    return s._content.items;
                })[0]
            });
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    select: function(req, res) {
        let pages = Page.findAll({
            type: "main"
        });
        res.json(pages);
    },

    config: function(req, res) {
        res.json(pageExt.parse().routes);
    },

    update: function(req, res) {
        req.body.file = req.file;
        let page = Page.update(req.body);
        res.json({ status: true, result: page });
    },

    create: function(req, res) {
        req.body.file = req.file;
        console.log(req.body);
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