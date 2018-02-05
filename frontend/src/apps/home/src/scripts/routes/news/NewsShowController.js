define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "socialShare",
    "scripts/helpers/Partial",
    "text!scripts/routes/news/news.hbs"
], function($, skylarkjs, hbs, server, socialShare, Partial, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    Partial.get("next-prev-partial");
    return spa.RouteController.inherit({
        klassName: "PostsShowController",
        news: null,
        result: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            if (id) {
                e.result = server().connect("news", "get", "show?id=" + id).then(function(result) {
                    self.news = result.item;
                    self.result = result;
                });
            } else {
                window.go("/news", true);
            }
        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#news-show-main").html()).replace("{{&gt;", "{{>"));

            e.content = $(tpl({
                showRoute: "news",
                prevId: this.result.prev.id,
                prevTitle: this.result.prev.title,
                nextId: this.result.next.id,
                nextTitle: this.result.next.title,
                id: this.news.id,
                title: this.news.title,
                abstract: this.news.abstract,
                imgUrl: this.news.src,
                date: window.formatDate(this.news.publishedDate)
            }));
            e.content.find(".post_overview").html(this.news.content);
        },

        rendered: function() {
            socialShare('.social-share, .share-component');
        },

        entered: function() {

        },
        exited: function() {}
    });
})