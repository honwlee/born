define([
    "skylarkjs",
    "text!scripts/routes/metUSA/metUSA.html"
], function(skylarkjs, metUSATpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "MetUSAController",

        rendering: function(e) {
            e.content = metUSATpl;
        },

        entered: function() {},
        exited: function() {}
    });
});