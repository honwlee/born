'use strict';
const Post = require('../../models/Post').Post;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("posts", req, res, ["title"]);
    },

    select: function(req, res) {
        parse("posts", req, res, ["title"]);
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