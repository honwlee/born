define([
    "skylarkjs",
    "text!scripts/routes/news/news.html"
], function(skylarkjs, newsTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "NewsController",

        rendering: function(e) {
            e.content = newsTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});