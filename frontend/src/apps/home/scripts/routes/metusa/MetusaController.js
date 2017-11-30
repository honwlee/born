define([
    "skylarkjs",
    "text!scripts/routes/metusa/metusa.html"
], function(skylarkjs, metusaTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "MetusaController",

        rendering: function(e) {
            e.content = metusaTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});