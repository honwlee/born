'use strict';
const Qa = require('../../models/Qa').Qa;
const _ = require('lodash');
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        req.query.direction = req.query.direction || "desc";
        req.query.sort = req.query.sort || "publishedDate";
        parse("qas", req, res, ["title"]);
    },

    select: function(req, res) {
        parse("qas", req, res, ["title"]);
    },

    public: function(req, res) {
        req.query.sort = "publishedDate";
        req.query.order = "DESC";
        let result = parse("qas", req, res, ["title"], {
            published: 'true'
        }, true);
        res.json({
            total: result.total,
            rows: Qa.format(result.chain)
        })
    },

    recommended: function(req, res) {
        res.json({ status: true, results: Qa.list("updatedAt", "desc", true).take(req.query.limit || 8) });
    },

    show: function(req, res) {
        let qa = Qa.findBy({
            id: req.query.id
        });
        if (!qa.viewCount) qa.viewCount = 0;
        qa.viewCount += 1;
        Qa.update({
            id: qa.id,
            publishedDate: qa.publishedDate,
            viewCount: qa.viewCount
        });
        res.json(qa);
    },

    update: function(req, res) {
        req.body.file = req.file;
        let qa = Qa.update(req.body);
        res.json({ status: true, result: qa });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Qa, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Qa.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Qa.importData());
    }
}