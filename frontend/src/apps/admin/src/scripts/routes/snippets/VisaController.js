define([
    "jquery",
    "skylarkjs",
    "./SnippetsController"
], function($, skylarkjs, Snippets) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Snippets.inherit({
        klassName: "VisaController",
        repeaterId: "sVisaRepeater",
        title: "签证办理列表",
        addTitle: "添加签证办理",
        actionName: "visa"
    });
});