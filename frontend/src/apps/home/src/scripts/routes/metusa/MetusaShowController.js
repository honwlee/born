define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "simplemde",
    "server",
    "text!scripts/routes/metusa/metusa.hbs"
], function($, skylarkjs, hbs, SimpleMDE, server, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "MetusaShowController",
        post: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];

            e.result = server().connect("posts", "get", "show?id=" + id).then(function(post) {
                window.setActiveRouteIdData(post);
                self.post = post;
            });
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
            var simplemde = new SimpleMDE({
                element: e.content.find("textarea")[0]
            });
            e.content.find(".post_overview").html(simplemde.markdown(this.post.content));
            simplemde.toTextArea();
            simplemde = null;
        },

        entered: function() {

        },
        exited: function() {}
    });
});