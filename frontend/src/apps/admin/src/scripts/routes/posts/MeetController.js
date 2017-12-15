define([
    "jquery",
    "skylarkjs",
    "./PostsController"
], function($, skylarkjs, Post) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Post.inherit({
        klassName: "MeetController",
        repeaterId: "meetRepeater",
        title: "遇见列表",
        addTitle: "添加遇见",
        actionName: "meet"
    });
});