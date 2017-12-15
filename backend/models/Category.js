'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Category = class Category extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("categories", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("categories", args);
    }
    static findAll(args) {
        return Model.findAll("categories", args);
    }
    static findOrCreate(key, args) {
        return Model.findOrCreate("categories", key, args);
    }
    static findByReg(args) {
        return Model.findByReg("categories", args);
    }
    static where(key, value, chainAble) {
        return Model.where("categories", key, value, chainAble);
    }
    static create(args) {
        return Model.create("categories", args);
    }
    static update(args) {
        return Model.update("categories", "id", args);
    }
    static delete(args) {
        return Model.delete("categories", args);
    }
    static importData() {
        let categories = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/categories.json"), 'utf8'));
        let results = [];
        categories.forEach(function(attachment) {
            results.push(Model.findOrCreate("categories", "name", attachment));
        });
        return results;
    }
    static exportData() {

    }
}