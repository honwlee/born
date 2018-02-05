'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Qa = class Qa extends Model {
    static list(sortKey = "updatedAt", direction = "asc", chainAble) {
        return Model.list("qas", sortKey, direction, chainAble);
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
    static where(key, value, chainAble) {
        return Model.where("qas", key, value, chainAble);
    }
    static format(chain, keys) {
        if (keys) {
            return chain.map(function(p) {
                let obj = {};
                keys.forEach(function(key) {
                    obj[key] = p[key];
                });
                return obj;
            });
        } else {
            return chain.map(function(p) {
                return {
                    id: p.id,
                    title: p.title,
                    src: p.src,
                    publishedDate: p.publishedDate,
                    viewCount: p.viewCount,
                    updatedAt: p.updatedAt,
                    abstract: p.abstract
                };
            });
        }
    }
    static create(args) {
        let d = new Date();
        if (!args.publishedDate) {
            args.publishedDate = d;
        } else {
            args.publishedDate = new Date(args.publishedDate + "T" + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":"));
        }
        args.publishedDate = new Date(args.publishedDate);
        return Model.create("qas", args);
    }
    static update(args) {
        if (args.publishedDate) {
            let d = new Date();
            args.publishedDate = new Date(args.publishedDate + "T" + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":"));
        }
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