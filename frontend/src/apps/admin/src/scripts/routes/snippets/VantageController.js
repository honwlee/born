define([
    "jquery",
    "skylarkjs",
    "./SnippetsController"
], function($, skylarkjs, Snippets) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Snippets.inherit({
        klassName: "VantageController",
        repeaterId: "sVantageRepeater",
        title: "优势列表",
        addTitle: "添加优势",
        actionName: "vantage"
    });
});