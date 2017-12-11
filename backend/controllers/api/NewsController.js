'use strict';
const News = require('../../models/News').News;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("news", req, res, ["title"]);
    },

    show: function(req, res) {
        let news = News.findBy({
            id: req.query.id
        });
        res.json(news);
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