'use strict';
const Post = require('../../models/Post').Post;
const _ = require('lodash');
const Category = require('../../models/Category').Category;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;

module.exports = {
    index: function(req, res) {
        parse("posts", req, res, ["title"]);
    },

    select: function(req, res) {
        parse("posts", req, res, ["title"]);
    },

    public: function(req, res) {
        parse("posts", req, res, ["title"], {
            published: true
        });
    },

    show: function(req, res) {
        let post = Post.findBy({
            id: req.query.id
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

_(["meet", "activity", "process", "env"]).each(function(name) {
    let catName = "posts_" + name;
    module.exports[name] = function(req, res) {
        parse("posts", req, res, ["title"], {
            category: catName
        });
    };
    module.exports["post_" + name] = function(req, res) {
        let category = Category.findOrCreate("name", {
            name: catName,
            type: "post",
            usage: 2
        });
        req.body.category = catName;
        req.body.file = req.file;
        validate(Post, { title: req.body.title }, req, res);
    };
    module.exports["public_" + name] = function(req, res) {
        parse("posts", req, res, ["title"], {
            published: 'true',
            category: catName
        });
    };
});