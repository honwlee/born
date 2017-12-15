'use strict';
const _ = require('lodash');
const Page = require('../../models/Page').Page;
const Slide = require('../../models/Slide').Slide;
const Content = require('../../models/Content').Content;
const parse = require('../../exts/parseList').parse;
const pageExt = require("../../exts/page");
const validate = require('../../exts/validation').validate;
const Model = require("../../models/_Base").Model;
module.exports = {
    index: function(req, res) {
        parse("pages", req, res, ["name", "type"]);
    },
    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let page = Page.findByReg(opt)[0];
        if (!page) return res.json({ status: false, msg: "no results!" });
        let slides = Slide.findAll({
            page: page.name
        });
        let contents = Content.where("id", page.contents, true);
        let _contents = contents.map(function(c) {
            let obj = {
                id: c.id,
                page: c.page,
                tpl: c.tpl,
                name: c.name,
                sub: {
                    title: c.sub.title,
                    content: c.sub.content
                }
            };
            if (c.sub._content) {
                let tableName = c.sub._content.type;
                let sIds = _(c.sub._content.items).map(function(i) { return i.id; }).value();
                obj.sub[tableName] = Model.where(tableName, "id", sIds);
            }
            return obj;
        }).value();
        let subs = Page.where("id", page.subs);
        if (page) {
            res.json({
                page: page,
                subs: subs,
                contents: _contents,
                slide: slides.map(function(s) {
                    return s._content.items;
                })[0]
            });
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    public: function(req, res) {
        let result = parse("pages", req, res, ["name", "type"], true);
        res.json({
            total: result.total,
            rows: result.rows.filter(function(s) {
                return s.published;
            }).value()
        })
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