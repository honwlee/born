'use strict';
const _ = require('lodash');
const News = require('../../models/News').News;
const Qa = require('../../models/Qa').Qa;
const Post = require('../../models/Post').Post;
module.exports = {
    all: function(req, res) {
        let limit = req.query.limit || 8;
        let news = _(News.format(News.list("updatedAt", "desc", true).filter(function(r) {
            return r.published == 'true';
        }).take(limit), ["id", "title"]));
        let posts = _(Post.format(Post.list("updatedAt", "desc", true).filter(function(r) {
            return r.published == 'true' && r.category == "posts_meet";
        }).take(limit), ["id", "title"]));
        let qas = _(Qa.format(Qa.list("updatedAt", "desc", true).filter(function(r) {
            return r.published == 'true';
        }).take(limit), ["id", "title"]));
        res.json({
            status: true,
            results: {
                news: news,
                posts: posts,
                qas: qas
            }
        });
    }
}