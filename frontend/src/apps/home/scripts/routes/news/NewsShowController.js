define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "simplemde",
    "server",
    "./data",
    "text!scripts/routes/news/show.hbs"
], function($, skylarkjs, hbs, SimpleMDE, server, data, showTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "PostsShowController",
        post: null,
        preparing: function(e) {
            var deferred = new langx.Deferred(),
                self = this,
                id = e.route.getNamedValue()[1];
            // server().connect("posts", "get", "show?id=" + id).then(function(post) {
            //     self.post = post;
            //     deferred.resolve();
            // });
            // e.result = deferred.promise;
            self.post = data.filter(function(d) {
                return d.id == id;
            })[0];
            e.result = langx.Deferred.when(true);
        },
        rendering: function(e) {
            var selector = $(langx.trim(showTpl));
            var tpl = hbs.compile(langx.trim(selector.find("#news-show-main").html()).replace("{{&gt;", "{{>"));

            e.content = $(tpl({
                id: this.post.id,
                title: this.post.title,
                imgUrl: this.post.imgUrl,
                date: new Date(this.post.date).toISOString().substring(0, 10)
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