define([
    "skylarkjs",
    "text!scripts/routes/about/about.html"
], function(skylarkjs, abouttTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "AboutContactController",

        rendering: function(e) {
            e.content = abouttTpl;
        },
        rendered: function() {
            $('#aTabList a[href="#aContact"]').tab('show');
            $("#aTabList").find('a').off('shown.bs.tab').on('shown.bs.tab', function(e) {
                var path = $(e.currentTarget).data("path");
                window.go(path, true);
            });
        },
        entered: function() {},
        exited: function() {}
    });
});