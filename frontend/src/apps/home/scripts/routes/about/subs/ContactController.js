define([
    "skylarkjs",
    "text!scripts/routes/about/subs/contact.html"
], function(skylarkjs, contactTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "AboutContactController",

        rendering: function(e) {
            e.content = contactTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});