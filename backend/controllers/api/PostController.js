'use strict';
const Post = require('../../models/Post').Post;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("posts", req, res, ["title"]);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let post = Post.findByReg(opt);
        if (post) {
            res.json(post);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
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
