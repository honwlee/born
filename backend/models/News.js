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
    static format(chain, keys) {
        if (keys) {
            return chain.map(function(p) {
                let obj = {};
                keys.forEach(function(key) {
                    obj[key] = p[key];
                });
                return obj;
            });
        } else {
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
    }
    static create(args) {
        let d = new Date();
        if (!args.publishedDate) {
            args.publishedDate = d;
        } else {
            args.publishedDate = new Date(args.publishedDate + "T" + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":"));
        }
        args.publishedDate = new Date(args.publishedDate);
        return Model.create("news", args);
    }
    static update(args) {
        if (args.publishedDate) {
            let d = new Date();
            args.publishedDate = new Date(args.publishedDate + "T" + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":"));
        }
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