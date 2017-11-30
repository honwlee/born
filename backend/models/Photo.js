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
    static create(args) {
        return Model.create("photos", args);
    }
    static update(args) {
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
