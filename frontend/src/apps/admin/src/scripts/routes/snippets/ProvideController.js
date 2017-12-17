define([
    "jquery",
    "skylarkjs",
    "./SnippetsController"
], function($, skylarkjs, Snippets) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Snippets.inherit({
        klassName: "ProvideController",
        repeaterId: "sProvideRepeater",
        title: "贴心服务列表",
        addTitle: "添加服务",
        snippetTplOpts: {
            needContent: true,
            isNormalContent: true,
            needDescription: true,
            needCover: true
        },
        actionName: "provide"
    });
});