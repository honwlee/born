define([
    "skylarkjs",
    "text!scripts/routes/repatriate/repatriate.html"
], function(skylarkjs, repatriateTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "RepatriateController",

        rendering: function(e) {
            e.content = repatriateTpl;
        },

        entered: function() {
        },
        exited: function() {
        }
    });
});
