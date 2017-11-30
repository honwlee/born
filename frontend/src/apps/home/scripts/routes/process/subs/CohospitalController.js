define([
    "skylarkjs",
    "text!scripts/routes/process/subs/cohospital.html"
], function(skylarkjs, cohospitalTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "ProcessCohospitalController",

        rendering: function(e) {
            e.content = cohospitalTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});