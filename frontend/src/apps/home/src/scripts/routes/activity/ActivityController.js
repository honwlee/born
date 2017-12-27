define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "scripts/helpers/Partial",
    "scripts/helpers/List",
    "text!scripts/routes/activity/activity.hbs"
], function($, skylarkjs, hbs, server, Partial, List, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        __selector = $(langx.trim(template));

    return spa.RouteController.inherit({
        klassName: "ActivityController",
        repeaterId: "homeActivityRepeater",
        buildList: function() {
            return new List({
                id: this.repeaterId,
                key: "posts",
                actionName: "public_activity",
                defaultView: "thumbnail",
                thumbnail_template: langx.trim(__selector.find("#activity-listItem-partial").html()),
                needHeader: false,
                columns: [{
                    label: 'name',
                    property: 'name',
                    sortable: false
                }]
            });
        },

        rendering: function(e) {
            var wrap = $("<div>").attr({
                    class: "panel-body activity-wrap"
                }),
                div = $("<div>").attr({
                    class: "container"
                }).appendTo(wrap),
                _ec = $("<div>").attr({
                    class: "row activity-repeater panel"
                }).appendTo(div),
                list = this.buildList();
            e.content = wrap[0];
            list.getDom().appendTo(_ec.empty());
            // _ec.delegate('.lightbox-item', 'click', function(e) {
            //     e.preventDefault();
            //     var id = $(e.currentTarget).data("id");
            //     window.go("/activity/" + id, true);
            //     // return $(this).lightbox({
            //     //     wrapping: false
            //     // });
            // });
        },

        rendered: function() {

        },

        entered: function() {},
        exited: function() {}
    });
});