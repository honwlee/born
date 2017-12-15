'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.News = class News extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("news", sortKey, direction);
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
    static create(args) {
        return Model.create("news", args);
    }
    static update(args) {
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