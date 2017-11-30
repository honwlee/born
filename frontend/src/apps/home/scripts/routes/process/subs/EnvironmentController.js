define([
    "skylarkjs",
    "text!scripts/routes/process/subs/environment.html"
], function(skylarkjs, environmentTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "ProcessEnvironmentController",

        rendering: function(e) {
            e.content = environmentTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});