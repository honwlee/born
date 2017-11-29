define([
    "skylarkjs",
    "text!scripts/routes/home/home.html"
], function(skylarkjs, homeTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "HomeController",

        rendering: function(e) {
            e.content = homeTpl;
        },

        entered: function() {
        },
        exited: function() {
        }
    });
});
