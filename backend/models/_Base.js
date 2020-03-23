'use strict';
let jsondb;
const path = require('path'),
    dbpath = path.join(__dirname, "../dbs"),
    // Q = require('q'),
    fs = require('fs'),
    request = require('request'),
    dbms = require('../lib/dbms/'),
    _ = require('lodash'),
    shortid = require('shortid'),
    uploadPath = path.join(__dirname, "../../public"),
    refresh = function() {
        return jsondb = dbms(dbpath, {
            master_file_name: "master.json"
        });
    };
refresh();
//used in local-signup strategy
class Model {
    constructor() {
        this.name = "";
    }
    static refresh() {
        return refresh();
    }
    static db(name) {
        refresh();
        return Model.encodeSrcWithChain(jsondb.get(name));
    }
    static list(name, sortKey = "id", direction = "asc", chainAble) {
        let results = Model.db(name).sortBy(sortKey);
        if (direction == "desc") results = results.reverse();
        return chainAble ? results : results.value();
    }
    static first(name) {
        let result = Model.db(name).first().value();
        return result;
    }
    static last(name) {
        let result = Model.db(name).last().value();
        return result;
    }
    static findBy(name, args) {
        let result = Model.db(name).find(args).value();
        return result;
    }
    static findAll(name, args) {
        let chain = Model.db(name).filter(function(r) {
            let result = true;
            for (let key in args) {
                result = result && r[key] == args[key];
            }
            return result;
        }).value();
        return chain;
    }
    static prevAndNext(name, key, value) {
        let chain = Model.db(name).filter(function(r) {
            return r.published == 'true';
        }).sortBy(function(element) {
            return _.get(element, "publishedDate");
        });
        let next = chain.filter(function(r) {
            return r[key] > value;
        }).map(function(_r) {
            return {
                id: _r.id,
                publishedDate: _r.publishedDate,
                title: _r.title
            };
        }).take(1).value();

        let prev = chain.reverse().filter(function(r) {
            return r[key] < value;
        }).map(function(_r) {
            return {
                id: _r.id,
                publishedDate: _r.publishedDate,
                title: _r.title
            };
        }).take(1).value();
        return {
            next: next[0] || {},
            prev: prev[0] || {}
        };
    }
    static format(chain) {
        return chain;
    }
    static encodeSrcWithChain(chain) {
        return chain.map(function(p) {
            let obj = {};
            for (let key in p) {
                if (key == "src") {
                    obj[key] = p[key].replace(p.file.filename, encodeURIComponent(p.file.filename));
                } else {
                    obj[key] = p[key];
                }

            };
            return obj;
        });
    }
    static encodeSrc(result) {
        if (result && result.src) result.src = result.src.replace(result.file.filename, encodeURIComponent(result.file.filename));
    }
    static findByReg(name, args) {
        let r = Model.db(name).filter(function(r) {
            let result = true;
            for (let key in args) {
                let reg = new RegExp(args[key], "i");
                result = result && r[key].length == args[key].length && r[key].match(reg);
            }
            return result;
        }).value();
        return r;
    }

    static where(name, key, value, chainAble) {
        let chain = Model.db(name).filter(function(r) {
            return _.includes(value, r[key]);
        });
        if (chainAble) {
            return chain;
        } else {
            return chain.value();
        }
    }

    static create(name, args) {
        refresh();
        args.id = shortid.generate();
        args.createdAt = new Date();
        args.updatedAt = new Date();
        if (args.file && args.file.path) {
            args.file.path = args.file.path.replace(uploadPath, "");
            args.src = args.file.path;
        }
        let result = jsondb.get(name).push(args).last().write();
        Model.encodeSrc(result);
        return result;
    }
    static findOrCreate(name, key, args) {
        refresh();
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
        Model.encodeSrc(result);
        return result;
    }
    static update(name, queryKey, args) {
        refresh();
        let opt = {};
        opt[queryKey] = args[queryKey];
        args.updatedAt = new Date();
        let result = jsondb.get(name).find(opt);
        if (!result.value()) {
            console.log(queryKey + "!!!! record not found!!!!! " + opt[queryKey]);
            return {};
        }
        if (result.value() && args.file && args.file.path) {
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
        Model.encodeSrc(result);
        return result;
    }
    static delete(name, args = {}) {
        refresh();
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
        let result = Model.db(name).size().value();
        return result;
    }
};
exports.Model = Model;