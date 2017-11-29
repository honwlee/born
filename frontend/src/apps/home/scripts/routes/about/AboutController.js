define([
    "skylarkjs",
    "text!scripts/routes/about/about.html"
], function(skylarkjs, aboutTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "AboutController",

        rendering: function(e) {
            e.content = aboutTpl;
        },

        entered: function() {
        },
        exited: function() {
        }
    });
});
