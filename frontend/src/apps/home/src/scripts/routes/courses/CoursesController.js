define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "scripts/helpers/Partial",
    "scripts/helpers/List",
    "text!scripts/routes/courses/courses.hbs"
], function($, skylarkjs, hbs, server, Partial, List, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        __selector = $(langx.trim(template));

    return spa.RouteController.inherit({
        klassName: "MetUsaController",
        repeaterId: "homeMetusaRepeater",
        // preparing: function(e) {
        //     var self = this;
        //     e.result = server().connect("recommended", "get", "all").then(function(data) {
        //         self.recommended = data.results;
        //     });
        // },
        buildList: function() {
            return new List({
                id: this.repeaterId,
                key: "courses",
                actionName: "public",
                defaultView: "thumbnail",
                thumbnail_template: langx.trim(__selector.find("#courses-listItem-partial").html()),
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
            var list = this.buildList();
            e.content = list.getDom()[0];
            // Partial.get("info-list-partial");
            // var tpl = hbs.compile("{{> info-list-partial}}"),
            //     self = this,
            //     _ec = $(tpl({
            //         routeName: "metusa",
            //         recommended: this.recommended
            //     })),
            //     list = this.buildList();
            // e.content = _ec[0];
            // list.getDom().appendTo(_ec.find(".repeater-container").empty());
            // _ec.delegate(".item", "click", function(e) {
            //     var id = $(e.currentTarget).data("id");
            //     window.go("/metusa/" + id, true);
            // });
        },

        rendered: function() {

        },

        entered: function() {},
        exited: function() {}
    });
});