define([
    "jquery",
    "skylarkjs",
    "./PostsController"
], function($, skylarkjs, Post) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Post.inherit({
        klassName: "EnvController",
        repeaterId: "envRepeater",
        title: "待产环境",
        addTitle: "添加待产环境",
        actionName: "env"
    });
});