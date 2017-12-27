'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Photo = class Photo extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("photos", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("photos", args);
    }
    static findAll(args) {
        return Model.findAll("photos", args);
    }
    static findByReg(args) {
        return Model.findByReg("photos", args);
    }
    static where(key, value, chainAble) {
        return Model.where("photos", key, value, chainAble);
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
                    src: p.src,
                    description: p.description,
                    link: p.link
                };
            });
        }
    }
    static create(args) {
        args.uniqName = args.name + "_" + (args.category || "")
        return Model.create("photos", args);
    }
    static update(args) {
        args.uniqName = args.name + "_" + (args.category || "")
        return Model.update("photos", "id", args);
    }
    static delete(args) {
        return Model.delete("photos", args);
    }
    static importData() {
        let photos = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/photos.json"), 'utf8'));
        let results = [];
        photos.forEach(function(photo) {
            results.push(Model.findOrCreate("photos", "username", photo));
        });
        return results;
    }
    static exportData() {

    }
}