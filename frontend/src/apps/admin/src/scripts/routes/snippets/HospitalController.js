define([
    "jquery",
    "skylarkjs",
    "./SnippetsController"
], function($, skylarkjs, Snippets) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Snippets.inherit({
        klassName: "HospitalController",
        repeaterId: "sHospitalRepeater",
        title: "合作医院列表",
        addTitle: "添加医院",
        snippetTplOpts: {
            needContent: true,
            isNormalContent: false,
            needDescription: false,
            needCover: false
        },
        actionName: "hospital"
    });
});