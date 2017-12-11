'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Banner = class Banner extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("qas", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("qas", args);
    }
    static findAll(args) {
        return Model.findAll("qas", args);
    }
    static findByReg(args) {
        return Model.findByReg("qas", args);
    }
    static create(args) {
        return Model.create("qas", args);
    }
    static update(args) {
        return Model.update("qas", "id", args);
    }
    static delete(args) {
        return Model.delete("qas", args);
    }
    static importData() {
        let qas = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/qas.json"), 'utf8'));
        let results = [];
        qas.forEach(function(banner) {
            results.push(Model.findOrCreate("qas", "name", banner));
        });
        return results;
    }
    static exportData() {

    }
}