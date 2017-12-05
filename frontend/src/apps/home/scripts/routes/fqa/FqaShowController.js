define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "simplemde",
    "server",
    "text!scripts/routes/posts/show.hbs"
], function($, skylarkjs, handlebars, SimpleMDE, server, showTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "PostsShowController",
        post: null,
        preparing: function(e) {
            var deferred = new langx.Deferred(),
                self = this,
                id = e.route.getNamedValue()[1];
            server().connect("posts", "get", "show?id=" + id).then(function(post) {
                self.post = post;
                deferred.resolve();
            });
            e.result = deferred.promise;
        },
        rendering: function(e) {
            var selector = $(langx.trim(showTpl));
            var tpl = handlebars.compile(langx.trim(selector.find("#post-show-main").html()).replace("{{&gt;", "{{>"));

            e.content = $(tpl({
                id: this.post.id,
                title: this.post.title,
                tags: this.post.tags || "",
                date: new Date(this.post.updatedAt).toISOString().substring(0, 10)
            }));
            var simplemde = new SimpleMDE({
                element: e.content.find("textarea")[0]
            });
            e.content.find(".post_overview").html(simplemde.markdown(this.post.markdown));
            simplemde.toTextArea();
            simplemde = null;
        },

        entered: function() {

        },
        exited: function() {}
    });
});
