'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    pageExt = require('../exts/page'),
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
    static where(key, value, chainAble) {
        return Model.where("pages", key, value, chainAble);
    }
    static create(args) {
        args.pathto = args.pathto.match(/^\//) ? args.pathto : "/" + args.pathto;
        if (args.parent) {
            let parent = Model.findBy("pages", {
                id: args.parent
            });
            args.parentName = parent.name;
            args.pathto = parent.pathto + args.pathto;
        }
        let result = Model.create("pages", args);
        if (!args.notUC) pageExt.add(result);
        return result;
    }
    static update(args) {
        args.subs = args.subs.split(",");
        args.contents = args.contents.split(",");
        let result = Model.update("pages", "id", args);
        if (!args.notUC) pageExt.update(result);
        return result;
    }
    static delete(args) {
        let result = Model.findBy("pages", args);
        pageExt.remove(result);
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