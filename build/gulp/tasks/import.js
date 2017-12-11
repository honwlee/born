'use strict';
const gulp = require('gulp'),
    gutil = require('gulp-util'),
    util = require('../utils'),
    del = require('del'),
    fs = require('fs'),
    path = require('path'),
    bcrypt = require('bcryptjs'),
    argv = require('yargs').argv,
    User = require('../../../backend/models/User').User,
    _ = require("lodash"),
    usersJson = require('../../../backend/data/users.json'),
    request = require('request'),
    json2xls = require('json2xls');

function importUser() {
    User.delete();
    usersJson.forEach(function(u) {
        let user = User.findOrCreate(u);
        console.log(user.username);
    });
}
module.exports = function() {
    importUser();
};