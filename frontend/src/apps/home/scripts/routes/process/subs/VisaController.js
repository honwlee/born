define([
    "skylarkjs",
    "text!scripts/routes/process/subs/visa.html"
], function(skylarkjs, visaTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "ProcessVisaController",

        rendering: function(e) {
            e.content = visaTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});