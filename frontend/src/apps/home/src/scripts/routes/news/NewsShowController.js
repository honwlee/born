define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "simplemde",
    "server",
    "text!scripts/routes/news/news.hbs"
], function($, skylarkjs, hbs, SimpleMDE, server, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "PostsShowController",
        post: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            e.result = server().connect("news", "get", "show?id=" + id).then(function(post) {
                self.post = post;
            });
        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#news-show-main").html()).replace("{{&gt;", "{{>"));

            e.content = $(tpl({
                id: this.post.id,
                title: this.post.title,
                abstract: this.post.abstract,
                imgUrl: this.post.src,
                date: new Date(this.post.publishedDate).toISOString().substring(0, 10)
            }));
        },

        entered: function() {

        },
        exited: function() {}
    });
})