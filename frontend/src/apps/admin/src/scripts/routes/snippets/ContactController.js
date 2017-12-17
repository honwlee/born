define([
    "jquery",
    "skylarkjs",
    "./SnippetsController"
], function($, skylarkjs, Snippets) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Snippets.inherit({
        klassName: "ContactController",
        repeaterId: "sContactRepeater",
        title: "联系我们列表",
        addTitle: "添加段内容",
        actionName: "contact",
        snippetTplOpts: {
            needContent: true,
            isNormalContent: false,
            needDescription: false,
            needCover: false
        },
    });
});