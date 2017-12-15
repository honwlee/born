define([
    "jquery",
    "skylarkjs",
    "./PostsController"
], function($, skylarkjs, Post) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Post.inherit({
        klassName: "AboutController",
        repeaterId: "aboutRepeater",
        title: "关于列表",
        addTitle: "添加关于",
        actionName: "about"
    });
});