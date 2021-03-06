'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Content = class Content extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("contents", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("contents", args);
    }
    static findAll(args) {
        return Model.findAll("contents", args);
    }
    static findByReg(args) {
        return Model.findByReg("contents", args);
    }
    static where(key, value, chainAble) {
        return Model.where("contents", key, value, chainAble);
    }
    static create(args) {
        if (args.sub) args.sub = JSON.parse(args.sub);
        args.uniqName = args.name + "_" + (args.category || "")
        return Model.create("contents", args);
    }
    static update(args) {
        if (args.sub) args.sub = JSON.parse(args.sub);
        args.uniqName = args.name + "_" + (args.category || "")
        return Model.update("contents", "id", args);
    }
    static delete(args) {
        return Model.delete("contents", args);
    }
    static importData() {
        let contents = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/contents.json"), 'utf8'));
        let results = [];
        contents.forEach(function(banner) {
            results.push(Model.findOrCreate("contents", "name", banner));
        });
        return results;
    }
    static exportData() {

    }
}