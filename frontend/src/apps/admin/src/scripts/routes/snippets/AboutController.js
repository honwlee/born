define([
    "jquery",
    "skylarkjs",
    "./SnippetsController"
], function($, skylarkjs, Snippets) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Snippets.inherit({
        klassName: "AboutController",
        repeaterId: "sAboutRepeater",
        title: "关于我们列表",
        addTitle: "添加段内容",
        actionName: "about",
        snippetTplOpts: {
            needContent: true,
            isNormalContent: false,
            needDescription: false,
            needCover: false
        },
    });
});