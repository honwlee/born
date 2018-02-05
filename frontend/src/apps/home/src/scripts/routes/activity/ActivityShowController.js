define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "socialShare",
    "scripts/helpers/Partial",
    "text!scripts/routes/activity/activity.hbs"
], function($, skylarkjs, hbs, server, socialShare, Partial, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    Partial.get("next-prev-partial");
    return spa.RouteController.inherit({
        klassName: "ActivityShowController",
        post: null,
        result: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            if (id) {
                e.result = server().connect("posts", "get", "show_activity?id=" + id).then(function(result) {
                    window.setActiveRouteIdData(result.item);
                    self.result = result;
                });
            } else {
                window.go("/activity", true);
            }
        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#activity-show-partial").html()).replace("{{&gt;", "{{>"));
            this.post = this.result.item;
            e.content = $(tpl({
                showRoute: "activity",
                prevId: this.result.prev.id,
                prevTitle: this.result.prev.title,
                nextId: this.result.next.id,
                nextTitle: this.result.next.title,
                id: this.post.id,
                title: this.post.title,
                abstract: this.post.abstract,
                imgUrl: this.post.src,
                date: window.formatDate(this.post.publishedDate)
            }));
            e.content.find(".post_overview").html(this.post.content);
        },

        rendered: function() {
            socialShare('.social-share, .share-component');
        },

        entered: function() {

        },
        exited: function() {}
    });
});