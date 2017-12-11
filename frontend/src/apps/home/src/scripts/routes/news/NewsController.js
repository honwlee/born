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
        klassName: "NewsController",
        news: null,
        preparing: function(e) {
            var self = this;
            e.result = server().connect("news", "get", "index").then(function(data) {
                self.news = data.rows;
            });
        },
        rendering: function(e) {
            Partial.get("info-list-partial");
            var tpl = hbs.compile("{{> info-list-partial}}"),
                self = this,
                _ec = $(tpl({
                    data: this.news,
                    routeName: "news",
                    latest: recommended,
                    recommended: recommended
                }));
            e.content = _ec[0];
            _ec.delegate(".article-item", "click", function(e) {
                var id = $(e.currentTarget).data("id");
                window.go("/news/" + id, true);
            });
        },

        rendered: function() {

        },

        entered: function() {},
        exited: function() {}
    });
});