define([
    "jquery",
    "skylarkjs",
    "skylarkBs",
    "text!scripts/routes/home/home.html"
], function($, skylarkjs, skylarkBs, homeTpl) {
    var spa = skylarkjs.spa;
    return spa.RouteController.inherit({
        klassName: "HomeController",

        rendering: function(e) {
            e.content = homeTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});