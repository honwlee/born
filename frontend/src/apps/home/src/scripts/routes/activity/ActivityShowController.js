define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "simplemde",
    "server",
    "text!scripts/routes/activity/activity.hbs"
], function($, skylarkjs, hbs, SimpleMDE, server, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "ActivityShowController",
        post: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            e.result = server().connect("posts", "get", "show?id=" + id).then(function(post) {
                self.post = post;
            });
        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#activity-show-partial").html()).replace("{{&gt;", "{{>"));

            e.content = $(tpl({
                id: this.post.id,
                title: this.post.title,
                abstract: this.post.abstract,
                imgUrl: this.post.src,
                date: window.formatDate(this.news.publishedDate)
            }));
            e.content.find(".post_overview").html(this.post.content);
        },

        entered: function() {

        },
        exited: function() {}
    });
});