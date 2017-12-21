'use strict';
const _ = require('lodash');
const Model = require("../../models/_Base").Model;
const Site = require('../../models/Site').Site;
const Page = require('../../models/Page').Page;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
const pageExt = require("../../exts/page");

function formatData(site) {
    let snippets = [];
    if (site._content && site._content.type) {
        let sIds = _(site._content.items).map(function(i) { return i.id; }).value();
        snippets = Model.where(site._content.type, "id", sIds, true).map(function(snippet) {
            let obj = {
                title: snippet.title
            };
            let sc = snippet._content;
            let iIds = _(sc.items).map(function(i) { return i.id; }).value();
            if (sc) obj[sc.type] = Model.where(sc.type, "id", iIds);
            return obj;
        });
    }
    return snippets;
};
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

    config: function(req, res) {
        let site = Site.first();
        res.json({
            site: site,
            routes: pageExt.parse().routes,
            snippets: formatData(site)
        });
    },

    update: function(req, res) {
        req.body.file = req.file;
        let site = Site.update(req.body);
        res.json({
            status: true,
            result: {
                site: site,
                snippets: formatData(site)
            }
        });
    },

    create: function(req, res) {
        req.body.file = req.file;
        let site = Site.first();
        if (site && site.id) {
            site = Site.update(req.body);
            res.json({
                status: true,
                result: {
                    site: site,
                    snippets: formatData(site)
                }
            });
        } else {
            validate(Site, { name: req.body.name }, req, res);
        }
    },

    delete: function(req, res) {
        Banner.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Site.importData());
    }
}