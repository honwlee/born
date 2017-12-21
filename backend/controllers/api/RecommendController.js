'use strict';
const News = require('../../models/News').News;
const Qa = require('../../models/Qa').Qa;
const Post = require('../../models/Post').Post;
module.exports = {
    all: function(req, res) {
        let limit = req.query.limit || 8;
        let news = News.list("updatedAt", "desc", true).filter(function(r) {
            return r.published == 'true';
        }).take(limit).value();
        let posts = Post.list("updatedAt", "desc", true).filter(function(r) {
            return r.published == 'true' && r.category == "posts_meet";
        }).take(limit).value();
        let qas = Qa.list("updatedAt", "desc", true).filter(function(r) {
            return r.published == 'true';
        }).take(limit).value();
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