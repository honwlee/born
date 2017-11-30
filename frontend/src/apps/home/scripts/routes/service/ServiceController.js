define([
    "skylarkjs",
    "text!scripts/routes/service/service.html"
], function(skylarkjs, serviceTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "ServiceController",

        rendering: function(e) {
            e.content = serviceTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});