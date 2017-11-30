'use strict';
const News = require('../../models/News').News;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("news", req, res, ["title"]);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let news = News.findByReg(opt);
        if (news) {
            res.json(news);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let news = News.update(req.body);
        res.json({ status: true, result: news });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(News, { title: req.body.title }, req, res);
    },

    delete: function(req, res) {
        News.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(News.importData());
    }
}
