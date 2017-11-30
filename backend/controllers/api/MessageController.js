'use strict';
const Message = require('../../models/Message').Message;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("messages", req, res, ["title"]);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let message = Message.findByReg(opt);
        if (message) {
            res.json(message);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let message = Message.update(req.body);
        res.json({ status: true, result: message });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Message, { title: req.body.title }, req, res);
    },

    delete: function(req, res) {
        Message.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Message.importData());
    }
}
