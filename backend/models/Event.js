'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Event = class Event extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("events", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("events", args);
    }
    static findAll(args) {
        return Model.findAll("events", args);
    }
    static findByReg(args) {
        return Model.findByReg("events", args);
    }
    static where(key, value) {
        return Model.where("events", key, value);
    }
    static create(args) {
        return Model.create("events", args);
    }
    static update(args) {
        return Model.update("events", "id", args);
    }
    static delete(args) {
        return Model.delete("events", args);
    }
    static importData() {
        let events = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/events.json"), 'utf8'));
        let results = [];
        events.forEach(function(event) {
            results.push(Model.findOrCreate("events", "username", event));
        });
        return results;
    }
    static exportData() {

    }
}