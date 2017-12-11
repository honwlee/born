'use strict';
const Grid = require('../../models/Grid').Grid;
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        parse("grids", req, res, ["name"]);
    },

    select: function(req, res) {
        let grids = Grid.findAll({
            type: "main"
        });
        res.json(grids);
    },

    show: function(req, res) {
        let opt = {};
        opt[req.query.key] = req.query.value;
        let grid = Grid.findByReg(opt);
        if (grid) {
            res.json(grid);
        } else {
            res.json({ status: false, msg: "no results!" });
        }
    },

    update: function(req, res) {
        req.body.file = req.file;
        let grid = Grid.update(req.body);
        res.json({ status: true, result: grid });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Grid, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Grid.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    },

    import: function(req, res) {
        res.json(Grid.importData());
    }
}