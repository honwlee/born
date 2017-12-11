'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Slide = class Banner extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("slides", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("slides", args);
    }
    static findAll(args) {
        return Model.findAll("slides", args);
    }
    static findByReg(args) {
        return Model.findByReg("slides", args);
    }
    static create(args) {
        if (args._content) args._content = JSON.parse(args._content);
        return Model.create("slides", args);
    }
    static update(args) {
        if (args._content) args._content = JSON.parse(args._content);
        return Model.update("slides", "id", args);
    }
    static delete(args) {
        return Model.delete("slides", args);
    }
    static importData() {
        let slides = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/slides.json"), 'utf8'));
        let results = [];
        slides.forEach(function(banner) {
            results.push(Model.findOrCreate("slides", "name", banner));
        });
        return results;
    }
    static exportData() {

    }
}