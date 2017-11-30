define([
    "skylarkjs",
    "text!scripts/routes/fqa/fqa.html"
], function(skylarkjs, fqaTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "FqaController",

        rendering: function(e) {
            e.content = fqaTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});