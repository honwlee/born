define([
    "jquery",
    "skylarkjs",
    "./SnippetsController"
], function($, skylarkjs, Snippets) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Snippets.inherit({
        klassName: "CertificateController",
        repeaterId: "sCertificateRepeater",
        title: "证件办理列表",
        addTitle: "添加办理",
        actionName: "certificate"
    });
});