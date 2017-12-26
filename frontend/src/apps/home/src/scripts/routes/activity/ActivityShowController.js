define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "socialShare",
    "text!scripts/routes/activity/activity.hbs"
], function($, skylarkjs, hbs, server, socialShare, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "ActivityShowController",
        post: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            if (id) {
                e.result = server().connect("posts", "get", "show?id=" + id).then(function(post) {
                    window.setActiveRouteIdData(post);
                    self.post = post;
                });
            } else {
                window.getComputedStyle("/activity", true);
            }
        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#activity-show-partial").html()).replace("{{&gt;", "{{>"));

            e.content = $(tpl({
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