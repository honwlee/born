'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Site = class Banner extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("sites", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("sites", args);
    }
    static findAll(args) {
        return Model.findAll("sites", args);
    }
    static findByReg(args) {
        return Model.findByReg("sites", args);
    }
    static create(args) {
        return Model.create("sites", args);
    }
    static update(args) {
        return Model.update("sites", "id", args);
    }
    static delete(args) {
        return Model.delete("sites", args);
    }
    static importData() {
        let sites = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/sites.json"), 'utf8'));
        let results = [];
        sites.forEach(function(banner) {
            results.push(Model.findOrCreate("sites", "name", banner));
        });
        return results;
    }
    static exportData() {

    }
}