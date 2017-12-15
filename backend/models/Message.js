'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Message = class Message extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("messages", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("messages", args);
    }
    static findAll(args) {
        return Model.findAll("messages", args);
    }
    static findByReg(args) {
        return Model.findByReg("messages", args);
    }
    static where(key, value, chainAble) {
        return Model.where("messages", key, value, chainAble);
    }
    static create(args) {
        return Model.create("messages", args);
    }
    static update(args) {
        return Model.update("messages", "id", args);
    }
    static delete(args) {
        return Model.delete("messages", args);
    }
    static importData() {
        let messages = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/messages.json"), 'utf8'));
        let results = [];
        messages.forEach(function(message) {
            results.push(Model.findOrCreate("messages", "username", message));
        });
        return results;
    }
    static exportData() {

    }
}