define([
    "skylarkjs",
    "text!scripts/routes/qa/qa.html"
], function(skylarkjs, qaTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "QaController",

        rendering: function(e) {
            e.content = qaTpl;
        },

        entered: function() {
        },
        exited: function() {
        }
    });
});
