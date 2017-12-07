define([
    "skylarkjs",
    "text!scripts/routes/test/test.html"
], function(skylarkjs, testTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "TestController",

        rendering: function(e) {
            e.content = testTpl;
        },

        entered: function() {
        },

        exited: function() {
        }
    });
});
