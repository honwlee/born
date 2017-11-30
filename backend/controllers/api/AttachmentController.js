'use strict';
const Attachment = require('../../models/Attachment').Attachment;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("attachments", req, res, ["name"]);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let attachment = Attachment.findByReg(opt);
        if (attachment) {
            res.json(attachment);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let attachment = Attachment.update(req.body);
        res.json({ status: true, result: attachment });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Attachment, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Attachment.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Attachment.importData());
    }
}
