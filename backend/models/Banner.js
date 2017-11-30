'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Banner = class Banner extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("banners", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("banners", args);
    }
    static findAll(args) {
        return Model.findAll("banners", args);
    }
    static findByReg(args) {
        return Model.findByReg("banners", args);
    }
    static create(args) {
        return Model.create("banners", args);
    }
    static update(args) {
        return Model.update("banners", "id", args);
    }
    static delete(args) {
        return Model.delete("banners", args);
    }
    static importData() {
        let banners = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/banners.json"), 'utf8'));
        let results = [];
        banners.forEach(function(banner) {
            results.push(Model.findOrCreate("banners", "name", banner));
        });
        return results;
    }
    static exportData() {

    }
}
