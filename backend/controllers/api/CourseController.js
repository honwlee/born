'use strict';
const Course = require('../../models/Course').Course;
const _ = require('lodash');
const parse = require('../../exts/parseList').parse;
const validate = require('../../exts/validation').validate;
module.exports = {
    index: function(req, res) {
        req.query.direction = req.query.direction || "desc";
        req.query.sort = req.query.sort || "publishedDate";
        parse("courses", req, res, ["title"]);
    },

    select: function(req, res) {
        parse("courses", req, res, ["title"]);
    },

    public: function(req, res) {
        req.query.sort = "publishedDate";
        req.query.order = "DESC";
        let result = parse("courses", req, res, ["title"], {
            published: 'true'
        }, true);
        res.json({
            total: result.total,
            rows: Course.format(result.chain)
        })
    },

    recommended: function(req, res) {
        res.json({
            status: true,
            results: Course.list("updatedAt", "desc", true).filter(function(n) {
                return n.published == 'true';
            }).take(req.query.limit || 8)
        });
    },

    show: function(req, res) {
        let course = Course.findBy({
            id: req.query.id
        });
        if (!course.viewCount) course.viewCount = 0;
        course.viewCount += 1;
        Course.update({
            id: course.id,
            viewCount: course.viewCount
        });
        let result = Course.prevAndNext("courses", "publishedDate", course.publishedDate);
        result.item = course;
        res.json(result);
    },

    update: function(req, res) {
        req.body.file = req.file;
        let course = Course.update(req.body);
        res.json({ status: true, result: course });
    },

    create: function(req, res) {
        req.body.file = req.file;
        validate(Course, { name: req.body.name }, req, res);
    },

    delete: function(req, res) {
        Course.delete(req.body);
        res.json({ status: true, msg: "删除成功！" });
    }
}