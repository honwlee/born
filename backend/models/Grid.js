'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Grid = class Grid extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("grids", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("grids", args);
    }
    static findAll(args) {
        return Model.findAll("grids", args);
    }
    static findByReg(args) {
        return Model.findByReg("grids", args);
    }
    static where(key, value, chainAble) {
        return Model.where("grids", key, value, chainAble);
    }
    static create(args) {
        return Model.create("grids", args);
    }
    static update(args) {
        return Model.update("grids", "id", args);
    }
    static delete(args) {
        return Model.delete("grids", args);
    }
    static importData() {
        let grids = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/grids.json"), 'utf8'));
        let results = [];
        grids.forEach(function(banner) {
            results.push(Model.findOrCreate("grids", "name", banner));
        });
        return results;
    }
    static exportData() {

    }
}