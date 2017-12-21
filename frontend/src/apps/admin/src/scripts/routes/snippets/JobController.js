define([
    "jquery",
    "skylarkjs",
    "./SnippetsController"
], function($, skylarkjs, Snippets) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Snippets.inherit({
        klassName: "JobController",
        repeaterId: "sJobRepeater",
        title: "工作机会",
        addTitle: "添加职位",
        actionName: "job",
        snippetTplOpts: {
            needContent: true,
            isNormalContent: false,
            needDescription: false,
            needCover: false
        },
    });
});