define([
    "jquery",
    "skylarkjs",
    "./ContentsController"
], function($, skylarkjs, Contents) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Contents.inherit({
        klassName: "LinkController",
        repeaterId: "cLinkRepeater",
        title: "链接模板内容列表",
        addTitle: "添加链接模板内容",
        actionName: "link",
        postAction: "post_link"
    });
});