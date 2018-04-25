'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Course = class Course extends Model {
    static list(sortKey = "updatedAt", direction = "asc", chainAble) {
        return Model.list("courses", sortKey, direction, chainAble);
    }
    static findBy(args) {
        return Model.findBy("courses", args);
    }
    static findAll(args) {
        return Model.findAll("courses", args);
    }
    static findByReg(args) {
        return Model.findByReg("courses", args);
    }
    static where(key, value, chainAble) {
        return Model.where("courses", key, value, chainAble);
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
        return Model.create("courses", args);
    }
    static update(args) {
        if (args.publishedDate) {
            let d = new Date();
            args.publishedDate = new Date(args.publishedDate + "T" + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":"));
        }
        return Model.update("courses", "id", args);
    }
    static delete(args) {
        return Model.delete("courses", args);
    }
    static importData() {
        let course = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/courses.json"), 'utf8'));
        let results = [];
        course.forEach(function(banner) {
            results.push(Model.findOrCreate("courses", "name", banner));
        });
        return results;
    }
    static exportData() {

    }
}