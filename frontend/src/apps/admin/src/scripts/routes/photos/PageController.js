define([
    "jquery",
    "skylarkjs",
    "./PhotosController"
], function($, skylarkjs, Photos) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Photos.inherit({
        klassName: "PhotoPageController",
        repeaterId: "photoPageRepeater",
        title: "页面banner图片列表",
        addTitle: "添加图片",
        needPageSelect: true,
        actionName: "page",

    });
});