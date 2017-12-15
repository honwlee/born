define([
    "jquery",
    "skylarkjs",
    "./PostsController"
], function($, skylarkjs, Post) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Post.inherit({
        klassName: "ProcessController",
        repeaterId: "processRepeater",
        title: "赴美流程列表",
        addTitle: "添加流程",
        actionName: "process"
    });
});