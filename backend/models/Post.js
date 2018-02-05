'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Post = class Post extends Model {
    static list(sortKey = "status", direction = "asc", chainAble) {
        return Model.list("posts", sortKey, direction, chainAble);
    }
    static findBy(args) {
        return Model.findBy("posts", args);
    }
    static findAll(args) {
        return Model.findAll("posts", args);
    }
    static findByReg(args) {
        return Model.findByReg("posts", args);
    }
    static where(key, value, chainAble) {
        return Model.where("posts", key, value, chainAble);
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
        args.uniqTile = args.title + "_" + (args.category || "")
        return Model.create("posts", args);
    }
    static update(args) {
        if (args.publishedDate) {
            let d = new Date();
            args.publishedDate = new Date(args.publishedDate + "T" + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":"));
        }
        args.uniqTile = args.title + "_" + (args.category || "")
        return Model.update("posts", "id", args);
    }
    static delete(args) {
        return Model.delete("posts", args);
    }
    static importData() {
        let posts = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/posts.json"), 'utf8'));
        let results = [];
        posts.forEach(function(post) {
            results.push(Model.findOrCreate("posts", "name", post));
        });
        return results;
    }
    static exportData() {

    }
}