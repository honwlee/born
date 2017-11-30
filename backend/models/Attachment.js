'use strict';
const Model = require("./_Base").Model,
    path = require('path'),
    fs = require('fs');

exports.Attachment = class Attachment extends Model {
    static list(sortKey = "status", direction = "asc") {
        return Model.list("attachments", sortKey, direction);
    }
    static findBy(args) {
        return Model.findBy("attachments", args);
    }
    static findAll(args) {
        return Model.findAll("attachments", args);
    }
    static findByReg(args) {
        return Model.findByReg("attachments", args);
    }
    static create(args) {
        return Model.create("attachments", args);
    }
    static update(args) {
        return Model.update("attachments", "id", args);
    }
    static delete(args) {
        return Model.delete("attachments", args);
    }
    static importData() {
        let attachments = JSON.parse(fs.readFileSync(path.join(__dirname, "../dbs/attachments.json"), 'utf8'));
        let results = [];
        attachments.forEach(function(attachment) {
            results.push(Model.findOrCreate("attachments", "name", attachment));
        });
        return results;
    }
    static exportData() {

    }
}
