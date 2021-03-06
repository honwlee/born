define([
    "jquery",
    "skylarkjs",
    "./ContentsController"
], function($, skylarkjs, Contents) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Contents.inherit({
        klassName: "HomeController",
        repeaterId: "cHomeRepeater",
        title: "页面模板内容列表",
        addTitle: "添加页面模板内容",
        actionName: "home",
        postAction: "post_home"
    });
});