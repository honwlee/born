'use strict';
const Qa = require('../../models/Qa').Qa;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("qas", req, res, ["title"]);
    },

    select: function(req, res) {
        parse("qas", req, res, ["title"]);
    },

    public: function(req, res) {
        let result = parse("qas", req, res, ["title"], true);
        res.json({
            total: result.total,
            rows: result.rows.filter(function(s) {
                return s.published;
            }).value()
        })
    },


    show: function(req, res) {
        let qa = Qa.findBy({
            id: req.query.id
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