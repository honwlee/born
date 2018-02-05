'use strict';
const Post = require('../../models/Post').Post;
const _ = require('lodash');
const Category = require('../../models/Category').Category;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;

module.exports = {
    index: function(req, res) {
        req.query.direction = req.query.direction || "desc";
        req.query.sort = req.query.sort || "publishedDate";
        parse("posts", req, res, ["title"]);
    },

    select: function(req, res) {
        parse("posts", req, res, ["title"]);
    },

    public: function(req, res) {
        let result = parse("posts", req, res, ["title"], {
            published: true
        }, true);
        res.json({
            total: result.total,
            rows: Post.format(result.chain)
        })
    },

    show: function(req, res) {
        let post = Post.findBy({
            id: req.query.id
        });
        if (!post.viewCount) post.viewCount = 0;
        post.viewCount += 1;
        Post.update({
            id: post.id,
            viewCount: post.viewCount
        });
        res.json(post);
    },

    update: function(req, res) {
        req.body.file = req.file;
        let post = Post.update(req.body);
        res.json({ status: true, result: post });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Post, { title: req.body.title }, req, res);
    },

    delete: function(req, res) {
        Post.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Post.importData());
    }
}

_(["meet", "activity", "process", "env", "service"]).each(function(name) {
    let catName = "posts_" + name;
    module.exports[name] = function(req, res) {
        parse("posts", req, res, ["title"], {
            category: catName
        });
    };
    module.exports["post_" + name] = function(req, res) {
        let category = Category.findOrCreate("name", {
            name: catName,
            type: "posts",
            usage: 2
        });
        req.body.category = catName;
        req.body.file = req.file;
        validate(Post, { uniqTitle: req.body.title + "_" + catName }, req, res);
    };
    module.exports["public_" + name] = function(req, res) {
        req.query.sort = "publishedDate";
        req.query.order = "DESC";
        let result = parse("posts", req, res, ["title"], {
            published: 'true',
            category: catName
        }, true);
        res.json({
            total: result.total,
            rows: Post.format(result.chain)
        })
    };
    module.exports["recommended_" + name] = function(req, res) {
        res.json({
            status: true,
            results: Post.list("updatedAt", "desc", true).filter(function(p) {
                return p.published == 'true' && p.category == catName;
            }).take(req.query.limit || 8)
        });
    };
    module.exports["show_" + name] = function(req, res) {
        let post = Post.findBy({
            id: req.query.id
        });
        if (!post.viewCount) post.viewCount = 0;
        post.viewCount += 1;
        Post.update({
            id: post.id,
            viewCount: post.viewCount
        });
        let chain = Post.db("posts").filter(function(r) {
            return r.published == 'true' && r.category == catName;
        }).sortBy(function(element) {
            return _.get(element, "publishedDate");
        });
        let next = chain.filter(function(r) {
            return r.publishedDate > post.publishedDate;
        }).map(function(_r) {
            return {
                id: _r.id,
                publishedDate: _r.publishedDate,
                title: _r.title
            };
        }).take(1).value();
        let prev = chain.reverse().filter(function(r) {
            return r.publishedDate < post.publishedDate;
        }).map(function(_r) {
            return {
                id: _r.id,
                publishedDate: _r.publishedDate,
                title: _r.title
            };
        }).take(1).value();
        let result = {
            next: next[0] || {},
            prev: prev[0] || {},
            item: post
        };
        res.json(result);
    };
});