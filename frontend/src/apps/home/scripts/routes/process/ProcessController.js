define([
    "skylarkjs",
    "text!scripts/routes/process/process.html"
], function(skylarkjs, processTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "ProcessController",

        rendering: function(e) {
            e.content = processTpl;
        },

        entered: function() {
        },
        exited: function() {
        }
    });
});
