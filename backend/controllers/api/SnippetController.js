'use strict';
const Snippet = require('../../models/Snippet').Snippet;
const _ = require('lodash');
const Category = require('../../models/Category').Category;
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
        let result = parse("snippets", req, res, ["title"], {
            published: "true"
        }, true);
        res.json({
            total: result.total,
            rows: Snippet.format(result.chain)
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
        validate(Snippet, { uniqTitle: req.body.title }, req, res);
    },

    delete: function(req, res) {
        Snippet.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Snippet.importData());
    }
}

_(["vantage", "provide", "visa", "hospital", "flow", "certificate", "about", "contact", "job", "service", "link"]).each(function(name) {
    let catName = "snippets_" + name;
    module.exports[name] = function(req, res) {
        parse("snippets", req, res, ["title"], {
            category: catName
        });
    };
    module.exports["post_" + name] = function(req, res) {
        let category = Category.findOrCreate("name", {
            name: catName,
            type: "snippets",
            usage: 2
        });
        req.body.category = catName;
        req.body.file = req.file;
        validate(Snippet, { uniqTitle: req.body.title + "_" + catName }, req, res);
    };
    module.exports["public_" + name] = function(req, res) {
        let result = parse("snippets", req, res, ["title"], {
            published: 'true',
            category: catName
        }, true);
        res.json({
            total: result.total,
            rows: Snippet.format(result.chain)
        })
    };
});