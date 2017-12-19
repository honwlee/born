define([
    "jquery",
    "skylarkjs",
    "./ContentsController"
], function($, skylarkjs, Contents) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Contents.inherit({
        klassName: "ProcessController",
        repeaterId: "cProcessRepeater",
        title: "赴美流程模板内容列表",
        addTitle: "添加页面模板内容",
        actionName: "process",
        postAction: "post_process"
    });
});