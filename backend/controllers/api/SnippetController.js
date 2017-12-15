'use strict';
const Snippet = require('../../models/Snippet').Snippet;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("snippets", req, res, ["title"]);
    },

    select: function(req, res) {
        parse("snippets", req, res, ["title"]);
    },

    public: function(req, res) {
        let result = parse("snippets", req, res, ["title"], true);
        res.json({
            total: result.total,
            rows: result.rows.filter(function(s) {
                return s.published;
            }).value()
        })
    },


    show: function(req, res) {
        let snippet = Snippet.findBy({
            id: req.query.id
        });
        res.json(snippet);
    },

    update: function(req, res) {
        req.body.file = req.file;
        let snippet = Snippet.update(req.body);
        res.json({ status: true, result: snippet });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Snippet, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Snippet.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Snippet.importData());
    }
}