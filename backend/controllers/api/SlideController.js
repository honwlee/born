'use strict';
const Slide = require('../../models/Slide').Slide;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("slides", req, res, ["name"]);
    },

    select: function(req, res) {
        let slides = Slide.findAll({
            type: "main"
        });
        res.json(slides);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let slide = Slide.findByReg(opt);
        if (slide) {
            res.json(slide);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let slide = Slide.update(req.body);
        res.json({ status: true, result: slide });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Slide, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Slide.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Slide.importData());
    }
}