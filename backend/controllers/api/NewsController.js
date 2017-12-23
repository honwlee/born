'use strict';
const News = require('../../models/News').News;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("news", req, res, ["title"]);
    },

    select: function(req, res) {
        parse("news", req, res, ["title"]);
    },

    public: function(req, res) {
        req.query.sort = "publishedDate";
        req.query.order = "DESC";
        parse("news", req, res, ["title"], {
            published: 'true'
        });
    },

    recommended: function(req, res) {
        res.json({ status: true, results: News.list("updatedAt", "desc", true).take(req.query.limit || 8) });
    },

    show: function(req, res) {
        let news = News.findBy({
            id: req.query.id
        });
        if (!news.viewCount) news.viewCount = 0;
        news.viewCount += 1;
        News.update(news);
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