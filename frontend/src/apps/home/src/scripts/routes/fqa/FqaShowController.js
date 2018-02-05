define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "socialShare",
    "scripts/helpers/Partial",
    "text!scripts/routes/fqa/qa.hbs"
], function($, skylarkjs, hbs, server, socialShare, Partial, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    Partial.get("next-prev-partial");
    return spa.RouteController.inherit({
        klassName: "PostsShowController",
        qa: null,
        result: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            if (id) {
                e.result = server().connect("qas", "get", "show?id=" + id).then(function(result) {
                    window.setActiveRouteIdData(result.item);
                    self.result = result;
                });
            } else {
                window.go("/fqa", true);
            }

        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#fqa-show-main").html()).replace("{{&gt;", "{{>"));
            this.qa = this.result.item;
            e.content = $(tpl({
                showRoute: "fqa",
                prevId: this.result.prev.id,
                prevTitle: this.result.prev.title,
                nextId: this.result.next.id,
                nextTitle: this.result.next.title,
                id: this.qa.id,
                title: this.qa.title,
                abstract: this.qa.abstract,
                imgUrl: this.qa.src,
                date: window.formatDate(this.qa.publishedDate)
            }));
            e.content.find(".post_overview").html(this.qa.content);
        },

        rendered: function() {
            socialShare('.social-share, .share-component');
        },

        entered: function() {

        },
        exited: function() {}
    });
});