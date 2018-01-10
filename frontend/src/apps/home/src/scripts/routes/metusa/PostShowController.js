define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "socialShare",
    "text!scripts/routes/metusa/metusa.hbs"
], function($, skylarkjs, hbs, server, socialShare, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "PostsShowController",
        post: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            if (id) {
                e.result = server().connect("posts", "get", "show?id=" + id).then(function(post) {
                    self.post = post;
                });
            } else {
                window.go("/metusa", true);
            }
        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#metusa-show-main").html()).replace("{{&gt;", "{{>"));

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