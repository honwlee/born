define([
    "skylarkjs",
    "text!scripts/routes/activity/activity.html"
], function(skylarkjs, activityTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "ActivityController",

        rendering: function(e) {
            e.content = activityTpl;
        },

        entered: function() {
        },
        exited: function() {
        }
    });
});
