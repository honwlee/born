'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Snippet = class Snippet extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("snippets", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("snippets", args);
    }
    static findAll(args) {
        return Model.findAll("snippets", args);
    }
    static findByReg(args) {
        return Model.findByReg("snippets", args);
    }
    static where(key, value) {
        return Model.where("snippets", key, value);
    }
    static create(args) {
        return Model.create("snippets", args);
    }
    static update(args) {
        return Model.update("snippets", "id", args);
    }
    static delete(args) {
        return Model.delete("snippets", args);
    }
    static importData() {
        let snippets = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/snippets.json"), 'utf8'));
        let results = [];
        snippets.forEach(function(banner) {
            results.push(Model.findOrCreate("snippets", "name", banner));
        });
        return results;
    }
    static exportData() {

    }
}