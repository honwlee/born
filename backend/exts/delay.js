const schedule = require('node-schedule');
const User = require('../models/User').User;

function delay() {
    // 一个月后执行
    let date = new Date();
    let laterDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes());
    let job = schedule.scheduleJob(laterDate, function() {
        User.delay(true);
        console.log('delay job:' + new Date());
        job.cancel();
    });
}

exports.delay = delay;