define([
    "skylarkjs",
    "text!scripts/routes/meet/meet.html"
], function(skylarkjs, meetTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "MeetController",

        rendering: function(e) {
            e.content = meetTpl;
        },

        entered: function() {
        },
        exited: function() {
        }
    });
});
