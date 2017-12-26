'use strict';
const path = require('path'),
    dbpath = path.join(__dirname, "../dbs"),
    Q = require('q'),
    fs = require('fs'),
    request = require('request'),
    dbms = require('../lib/dbms/'),
    jsondb = dbms(dbpath, {
        master_file_name: "master.json"
    }),
    _ = require('lodash'),
    shortid = require('shortid'),
    uploadPath = path.join(__dirname, "../../public"),
    refresh = function() {
        jsondb = dbms(dbpath, {
            master_file_name: "master.json"
        });
    };
//used in local-signup strategy
class Model {
    constructor() {
        this.name = "";
    }
    static refresh() {
        refresh();
    }
    static db(name) {
        return jsondb.get(name);
    }
    static list(name, sortKey = "id", direction = "asc", chainAble) {
        let results = jsondb.get(name).sortBy(sortKey);
        if (direction == "desc") results = results.reverse();
        return chainAble ? results : results.value();
    }
    static first(name) {
        return jsondb.get(name).first().value();
    }
    static last(name) {
        return jsondb.get(name).last().value();
    }
    static findBy(name, args) {
        return jsondb.get(name).find(args).value();
    }
    static findAll(name, args) {
        return jsondb.get(name).filter(function(r) {
            let result = true;
            for (let key in args) {
                result = result && r[key] == args[key];
            }
            return result;
        }).value();
    }
    static format(chain) {
        return chain;
    }
    static findByReg(name, args) {
        return jsondb.get(name).filter(function(r) {
            let result = true;
            for (let key in args) {
                let reg = new RegExp(args[key], "i");
                result = result && r[key].length == args[key].length && r[key].match(reg);
            }
            return result;
        }).value();
    }

    static where(name, key, value, chainAble) {
        let chain = jsondb.get(name).filter(function(r) {
            return _.includes(value, r[key]);
        });
        if (chainAble) {
            return chain;
        } else {
            return chain.value();
        }
    }

    static create(name, args) {
        args.id = shortid.generate();
        args.createdAt = new Date();
        args.updatedAt = new Date();
        if (args.file && args.file.path) {
            args.file.path = args.file.path.replace(uploadPath, "");
            args.src = args.file.path;
        }
        let result = jsondb.get(name).push(args).last().write();
        return result;
    }
    static findOrCreate(name, key, args) {
        let query = {};
        query[key] = args[key];
        let result = jsondb.get(name).find(query).value();
        if (!result) {
            args.id = shortid.generate();
            args.createdAt = new Date();
            args.updatedAt = new Date();
            if (args.file && args.file.path) {
                args.file.path = args.file.path.replace(uploadPath, "");
                args.src = args.file.path;
            }
            result = Model.create(name, args);
        }
        return result;
    }
    static update(name, queryKey, args) {
        let opt = {};
        opt[queryKey] = args[queryKey];
        args.updatedAt = new Date();
        let result = jsondb.get(name).find(opt);
        if (args.file && args.file.path) {
            let file = result.value().file;
            if (file && file.path) {
                let fPath = path.join(uploadPath, file.path);
                if (fs.existsSync(fPath)) fs.unlinkSync(fPath);
            }
            args.file.path = args.file.path.replace(uploadPath, "");
            args.src = args.file.path;
        } else {
            args.file = result.value().file;
        }
        result.assign(args).write();
        return result;
    }
    static delete(name, args = {}) {
        let result = jsondb.get(name).find(args);
        if (result.value()) {
            let file = result.value().file;
            if (file && file.path) {
                let fPath = path.join(uploadPath, file.path);
                if (fs.existsSync(fPath)) fs.unlinkSync(fPath);
            }
        }
        result = jsondb.get(name).remove(args).write();
        return result;
    }
    static size(name) {
        let result = jsondb.get(name).size().value();
        return result;
    }
};
exports.Model = Model;