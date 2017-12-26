'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.News = class News extends Model {
    static list(sortKey = "status", direction = "asc", chainAble) {
        return Model.list("news", sortKey, direction, chainAble);
    }
    static findBy(args) {
        return Model.findBy("news", args);
    }
    static findAll(args) {
        return Model.findAll("news", args);
    }
    static findByReg(args) {
        return Model.findByReg("news", args);
    }
    static where(key, value, chainAble) {
        return Model.where("news", key, value, chainAble);
    }
    static format(chain) {
        return chain.map(function(p) {
            return {
                id: p.id,
                title: p.title,
                src: p.src,
                publishedDate: p.publishedDate,
                viewCount: p.viewCount,
                updatedAt: p.updatedAt,
                link: p.link,
                abstract: p.abstract
            };
        });
    }
    static create(args) {
        if (!args.publishedDate) args.publishedDate = new Date();
        args.publishedDate = new Date(args.publishedDate);
        return Model.create("news", args);
    }
    static update(args) {
        if (!args.publishedDate) args.publishedDate = new Date();
        args.publishedDate = new Date(args.publishedDate);
        return Model.update("news", "id", args);
    }
    static delete(args) {
        return Model.delete("news", args);
    }
    static importData() {
        let news = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/news.json"), 'utf8'));
        let results = [];
        news.forEach(function(n) {
            results.push(Model.findOrCreate("news", "username", n));
        });
        return results;
    }
    static exportData() {

    }
}