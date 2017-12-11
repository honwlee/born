'use strict';
const Qa = require('../../models/Qa').Qa;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("qas", req, res, ["name"]);
    },

    select: function(req, res) {
        let qas = Qa.findAll({
            type: "main"
        });
        res.json(qas);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let qa = Qa.findByReg(opt);
        if (qa) {
            res.json(qa);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
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