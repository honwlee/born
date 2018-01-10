'use strict';
const _ = require('lodash');
const Page = require('../../models/Page').Page;
const Slide = require('../../models/Slide').Slide;
const Content = require('../../models/Content').Content;
const Photo = require('../../models/Photo').Photo;
const Post = require('../../models/Post').Post;
const Qa = require('../../models/Qa').Qa;
const News = require('../../models/News').News;
const Snippet = require('../../models/Snippet').Snippet;
const parse = require('../../exts/parseList').parse;
const pageExt = require("../../exts/page");
const validate = require('../../exts/validation').validate;
const Model = require("../../models/_Base").Model;
const modules = {
    posts: Post,
    news: News,
    qas: Qa,
    photos: Photo,
    snippets: Snippet
}
module.exports = {
    index: function(req, res) {
        parse("pages", req, res, ["name", "type"]);
    },
    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let page = Page.findByReg(opt)[0];
        if (!page) return res.json({ status: false, msg: "no results!" });

        let photo = Photo.findAll({
            page: page.name
        })[0] || {};

        let _contents = [];
        _(page.contents).each(function(id) {
            let c = Content.findBy({ id: id });
            if (c) {
                let obj = {
                    id: c.id,
                    src: c.src,
                    page: c.page,
                    tpl: c.tpl,
                    name: c.name
                };
                if (c.sub) {
                    obj.sub = {
                        title: c.sub.title,
                        content: c.sub.content
                    }
                    if (c.sub._content) {
                        let tableName = c.sub._content.type;
                        switch (c.tpl) {
                            case "homeDesc":
                                obj.sub[tableName] = Model.list(tableName, "publishedDate", "desc", true).filter(function(p) {
                                    return p.category == "posts_meet";
                                }).take(3).value();
                                break;
                            case "homeActivity":
                                obj.sub[tableName] = Model.list(tableName, "publishedDate", "desc", true).filter(function(p) {
                                    return p.category == "posts_activity";
                                }).take(5).value();
                                break;
                            case "homeNews":
                                obj.sub[tableName] = Model.list(tableName, "publishedDate", "desc", true).take(4).value();
                                break;
                            default:
                                let sIds = c.sub._content.items.map(function(i) { return i.id; });
                                var ModuleM = modules[tableName];
                                if (ModuleM) {
                                    obj.sub[tableName] = ModuleM.format(ModuleM.where("id", sIds, true).filter(function(item) {
                                        return item.published === "true";
                                    }));
                                } else {
                                    obj.sub[tableName] = Model.where(tableName, "id", sIds, true).filter(function(item) {
                                        return item.published === "true";
                                    });
                                }
                        }
                    }

                }
                _contents.push(obj);
            }
        });

        let subs = Page.where("id", page.subs);
        if (page) {
            res.json({
                banner: photo.src,
                page: page,
                subs: subs,
                contents: _contents
            });
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    public: function(req, res) {
        let result = parse("pages", req, res, ["name", "type"], {
            published: 'true'
        }, true);
        res.json({
            total: result.total,
            rows: Page.format(result.chain)
        })
    },

    select: function(req, res) {
        let pages = Page.findAll({
            type: "_main_"
        });
        res.json(pages);
    },

    config: function(req, res) {
        res.json(pageExt.parse().routes);
    },

    update: function(req, res) {
        req.body.file = req.file;
        let page = Page.update(req.body);
        res.json({ status: true, result: page });
    },

    create: function(req, res) {
        req.body.file = req.file;
        console.log(req.body);
        validate(Page, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Page.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Page.importData());
    }
}