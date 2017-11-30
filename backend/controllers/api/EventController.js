'use strict';
const Event = require('../../models/Event').Event;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("events", req, res, ["title"]);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let event = Event.findByReg(opt);
        if (event) {
            res.json(event);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let event = Event.update(req.body);
        res.json({ status: true, result: event });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Event, { title: req.body.title }, req, res);
    },

    delete: function(req, res) {
        Event.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Event.importData());
    }
}
