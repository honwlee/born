define([
    "jquery",
    "skylarkjs",
    "./SnippetsController"
], function($, skylarkjs, Snippets) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;

    return Snippets.inherit({
        klassName: "FlowController",
        repeaterId: "sFlowRepeater",
        title: "流程列表",
        addTitle: "添加流程",
        actionName: "flow"
    });
});