define([
    "skylarkjs",
    "text!scripts/routes/ggggg/ggggg.html"
], function(skylarkjs, gggggTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "GggggController",

        rendering: function(e) {
            e.content = gggggTpl;
        },

        entered: function() {
        },

        exited: function() {
        }
    });
});
