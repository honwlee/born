define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "./data",
    "scripts/helpers/Partial"
], function($, skylarkjs, hbs, data, Partial) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    var recommended = [{
        id: "recommended1",
        title: "去美国生宝宝 产后忌口"
    }];
    return spa.RouteController.inherit({
        klassName: "FqaController",
        rendering: function(e) {
            Partial.get("info-list-partial");
            var tpl = hbs.compile("{{> info-list-partial}}"),
                self = this,
                _ec = $(tpl({
                    data: data,
                    routeName: "fqa",
                    latest: recommended,
                    recommended: recommended
                }));
            e.content = _ec[0];
            _ec.delegate(".article-item", "click", function(e) {
                var id = $(e.currentTarget).data("id");
                window.go("/fqa/" + id);
            });
        },

        rendered: function() {

        },

        entered: function() {},
        exited: function() {}
    });
});