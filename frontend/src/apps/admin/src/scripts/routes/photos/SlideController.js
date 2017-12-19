define([
    "jquery",
    "skylarkjs",
    "./PhotosController"
], function($, skylarkjs, Photos) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Photos.inherit({
        klassName: "PhotoSlideController",
        repeaterId: "photSlideRepeater",
        title: "slide图片列表",
        addTitle: "添加slide图片",
        needPageSelect: false,
        actionName: "slide"
    });
});