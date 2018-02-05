define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "socialShare",
    "scripts/helpers/Partial",
    "text!scripts/routes/metusa/metusa.hbs"
], function($, skylarkjs, hbs, server, socialShare, Partial, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    Partial.get("next-prev-partial");
    return spa.RouteController.inherit({
        klassName: "MetusaShowController",
        post: null,
        result: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            if (id) {
                e.result = server().connect("posts", "get", "show_meet?id=" + id).then(function(result) {
                    window.setActiveRouteIdData(result.item);
                    self.post = result.item;
                    self.result = result;
                });
            } else {
                window.go("/metusa", true);
            }
        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#metusa-show-main").html()).replace("{{&gt;", "{{>"));

            e.content = $(tpl({
                showRoute: "metusa",
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