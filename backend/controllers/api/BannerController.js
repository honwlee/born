'use strict';
const Banner = require('../../models/Banner').Banner;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("banners", req, res, ["name"]);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let banner = Banner.findByReg(opt);
        if (banner) {
            res.json(banner);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let banner = Banner.update(req.body);
        res.json({ status: true, result: banner });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Banner, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Banner.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Banner.importData());
    }
}
