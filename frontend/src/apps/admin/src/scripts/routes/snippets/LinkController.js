define([
    "jquery",
    "skylarkjs",
    "./SnippetsController"
], function($, skylarkjs, Snippets) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Snippets.inherit({
        klassName: "LinkController",
        repeaterId: "sLinkRepeater",
        title: "链接列表",
        addTitle: "添加内容",
        actionName: "link",
        snippetTplOpts: {
            needContent: false,
            isNormalContent: false,
            needDescription: false,
            needCover: false,
            select: {
                title: "选择链接",
                type: "links"
            }
        },
    });
});