define([
    "jquery",
    "skylarkjs",
    "text!scripts/routes/home/home.html"
], function($, skylarkjs, homeTpl) {
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