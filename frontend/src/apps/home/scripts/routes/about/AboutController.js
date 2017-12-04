define([
    "skylarkjs",
    "text!scripts/routes/about/about.html"
], function(skylarkjs, aboutTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "AboutController",

        rendering: function(e) {
            e.content = aboutTpl;
        },
        rendered: function() {
            $('#aTabList a[href="#aAbout"]').tab('show');
            $("#aTabList").find('a').off('shown.bs.tab').on('shown.bs.tab', function(e) {
                var path = $(e.currentTarget).data("path");
                window.go(path, true);
            });
        },
        entered: function() {
        },
        exited: function() {
        }
    });
});
