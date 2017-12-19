define([
    "jquery",
    "skylarkjs",
    "./ContentsController"
], function($, skylarkjs, Contents) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Contents.inherit({
        klassName: "ServiceController",
        repeaterId: "cServiceRepeater",
        title: "回国服务内容列表",
        addTitle: "添加页面模板内容",
        actionName: "service",
        postAction: "post_service"
    });
});