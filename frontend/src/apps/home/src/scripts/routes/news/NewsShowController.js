define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "socialShare",
    "text!scripts/routes/news/news.hbs"
], function($, skylarkjs, hbs, server, socialShare, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "PostsShowController",
        news: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            if (id) {
                e.result = server().connect("news", "get", "show?id=" + id).then(function(news) {
                    self.news = news;
                });
            } else {
                window.go("/news", true);
            }
        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#news-show-main").html()).replace("{{&gt;", "{{>"));

            e.content = $(tpl({
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