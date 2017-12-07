define([
    "skylarkjs",
    "text!scripts/routes/xxxx/xxxx.html"
], function(skylarkjs, xxxxTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "XxxxController",

        rendering: function(e) {
            e.content = xxxxTpl;
        },

        entered: function() {
        },

        exited: function() {
        }
    });
});
