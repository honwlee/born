define([
    "skylarkjs",
    "text!scripts/routes/QA/QA.html"
], function(skylarkjs, QATpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "QAController",

        rendering: function(e) {
            e.content = QAtTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});