'use strict';
const Site = require('../../models/Site').Site;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("sites", req, res, ["name"]);
    },

    select: function(req, res) {
        let sites = Site.findAll({
            type: "main"
        });
        res.json(sites);
    },

    show: function(req, res) {
        let site = Site.first();
        if (site) {
            res.json(site);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let site = Site.update(req.body);
        res.json({ status: true, result: site });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Site, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Banner.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Site.importData());
    }
}