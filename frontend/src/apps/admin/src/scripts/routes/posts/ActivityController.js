define([
    "jquery",
    "skylarkjs",
    "./PostsController"
], function($, skylarkjs, Post) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Post.inherit({
        klassName: "ActivityController",
        repeaterId: "activityRepeater",
        title: "活动列表",
        addTitle: "添加活动",
        actionName: "activity"
    });
});