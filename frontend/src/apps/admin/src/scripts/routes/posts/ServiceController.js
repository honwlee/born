define([
    "jquery",
    "skylarkjs",
    "./PostsController"
], function($, skylarkjs, Post) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Post.inherit({
        klassName: "ServiceController",
        repeaterId: "serviceRepeater",
        title: "服务列表",
        addTitle: "添加服务",
        actionName: "service"
    });
});