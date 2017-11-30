'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Keyword = class Keyword extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("keywords", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("keywords", args);
    }
    static findAll(args) {
        return Model.findAll("keywords", args);
    }
    static findByReg(args) {
        return Model.findByReg("keywords", args);
    }
    static create(args) {
        return Model.create("keywords", args);
    }
    static update(args) {
        return Model.update("keywords", "id", args);
    }
    static delete(args) {
        return Model.delete("keywords", args);
    }
    static importData() {
        let keywords = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/keywords.json"), 'utf8'));
        let results = [];
        keywords.forEach(function(keyword) {
            results.push(Model.findOrCreate("keywords", "username", keyword));
        });
        return results;
    }
    static exportData() {

    }
}
