define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "scripts/helpers/Partial"
], function($, skylarkjs, hbs, server, Partial) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    var recommended = [{
        id: "recommended1",
        title: "去美国生宝宝 产后忌口"
    }];
    return spa.RouteController.inherit({
        klassName: "MetusaController",
        posts: null,
        preparing: function(e) {
            var self = this;
            e.result = server().connect("posts", "get", "index").then(function(data) {
                self.posts = data.rows;
            });
        },
        rendering: function(e) {
            Partial.get("info-list-partial");
            var tpl = hbs.compile("{{> info-list-partial}}"),
                self = this,
                _ec = $(tpl({
                    data: this.posts,
                    routeName: "metusa",
                    latest: recommended,
                    recommended: recommended
                }));
            e.content = _ec[0];
            _ec.delegate(".article-item", "click", function(e) {
                var id = $(e.currentTarget).data("id");
                window.go("/metusa/" + id, true);
            });
        },

        rendered: function() {

        },

        entered: function() {},
        exited: function() {}
    });
});