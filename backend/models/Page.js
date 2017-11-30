'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Page = class Page extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("pages", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("pages", args);
    }
    static findAll(args) {
        return Model.findAll("pages", args);
    }
    static findByReg(args) {
        return Model.findByReg("pages", args);
    }
    static create(args) {
        return Model.create("pages", args);
    }
    static update(args) {
        return Model.update("pages", "id", args);
    }
    static delete(args) {
        return Model.delete("pages", args);
    }
    static importData() {
        let pages = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/pages.json"), 'utf8'));
        let results = [];
        pages.forEach(function(page) {
            results.push(Model.findOrCreate("pages", "name", page));
        });
        return results;
    }
    static exportData() {

    }
}
