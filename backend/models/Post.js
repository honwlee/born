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
    static create(args) {
        if (!args.publishedDate) args.publishedDate = new Date();
        args.uniqTile = args.title + "_" + (args.category || "")
        args.publishedDate = new Date(args.publishedDate);
        return Model.create("posts", args);
    }
    static update(args) {
        if (!args.publishedDate) args.publishedDate = new Date();
        args.uniqTile = args.title + "_" + (args.category || "")
        args.publishedDate = new Date(args.publishedDate);
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