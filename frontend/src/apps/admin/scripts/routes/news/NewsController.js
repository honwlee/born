define([
    "jquery",
    "skylarkjs",
    "text!scripts/routes/news/news.hbs"
], function($, skylarkjs, newsTpl) {
    var spa = skylarkjs.spa;
    return spa.RouteController.inherit({
        klassName: "NewsController",

        rendering: function(e) {
            e.content = newsTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});