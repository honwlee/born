define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "scripts/helpers/Partial",
    "scripts/helpers/List"
], function($, skylarkjs, hbs, server, Partial, List) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    var recommended = [{
        id: "recommended1",
        title: "去美国生宝宝 产后忌口"
    }];
    return spa.RouteController.inherit({
        klassName: "MetUsaController",
        repeaterId: "homeMetusaRepeater",
        buildList: function() {
            return new List({
                title: "新闻列表",
                id: this.repeaterId,
                key: "posts",
                defaultView: "thumbnail",
                thumbnail_template: '<div class="thumbnail repeater-thumbnail" style="background: {{color}};"><img height="75" src="{{cover}}" width="65"><span>{{name}}</span></div>',
                needHeader: false,
                columns: [{
                    label: '封面',
                    property: 'cover',
                    sortable: true
                }, {
                    label: 'title',
                    property: 'page',
                    sortable: false
                }]
            });
        },

        rendering: function(e) {
            Partial.get("info-list-partial");
            var tpl = hbs.compile("{{> info-list-partial}}"),
                self = this,
                _ec = $(tpl({
                    routeName: "metusa",
                    latest: recommended,
                    recommended: recommended
                })),
                list = this.buildList();
            e.content = _ec[0];
            list.getDom().appendTo(_ec.find(".repeater-container").empty());
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