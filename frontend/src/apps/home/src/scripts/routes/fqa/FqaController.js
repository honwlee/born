define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "scripts/helpers/Partial",
    "scripts/helpers/List",
    "text!scripts/routes/fqa/qa.hbs"
], function($, skylarkjs, hbs, server, Partial, List, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        __selector = $(langx.trim(template));
    var recommended = [{
        id: "recommended1",
        title: "去美国生宝宝 产后忌口"
    }];
    return spa.RouteController.inherit({
        klassName: "FqaController",
        repeaterId: "homeQaRepeater",
        preparing: function(e) {
            var self = this;
            e.result = server().connect("recommended", "get", "all").then(function(data) {
                self.recommended = data.results;
            });
        },
        buildList: function() {
            return new List({
                id: this.repeaterId,
                key: "qas",
                defaultView: "thumbnail",
                actionName: "public",
                thumbnail_template: langx.trim(__selector.find("#qa-listItem-partial").html()),
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
                    routeName: "fqa",
                    recommended: this.recommended
                })),
                list = this.buildList();
            e.content = _ec[0];
            list.getDom().appendTo(_ec.find(".repeater-container").empty());
            _ec.delegate(".item", "click", function(e) {
                var id = $(e.currentTarget).data("id");
                window.go("/fqa/" + id, true);
            });
        },

        rendered: function() {

        },

        entered: function() {},
        exited: function() {}
    });
});