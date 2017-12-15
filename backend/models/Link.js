'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Link = class Link extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("links", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("links", args);
    }
    static findAll(args) {
        return Model.findAll("links", args);
    }
    static findByReg(args) {
        return Model.findByReg("links", args);
    }
    static where(key, value, chainAble) {
        return Model.where("links", key, value, chainAble);
    }
    static create(args) {
        return Model.create("links", args);
    }
    static update(args) {
        return Model.update("links", "id", args);
    }
    static delete(args) {
        return Model.delete("links", args);
    }
    static importData() {
        let links = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/links.json"), 'utf8'));
        let results = [];
        links.forEach(function(product) {
            results.push(Model.findOrCreate("links", "username", product));
        });
        return results;
    }
    static exportData() {

    }
}