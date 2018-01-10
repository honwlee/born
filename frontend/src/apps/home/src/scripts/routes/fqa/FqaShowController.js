define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "socialShare",
    "text!scripts/routes/fqa/qa.hbs"
], function($, skylarkjs, hbs, server, socialShare, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "PostsShowController",
        qa: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            if (id) {
                e.result = server().connect("qas", "get", "show?id=" + id).then(function(qa) {
                    window.setActiveRouteIdData(qa);
                    self.qa = qa;
                });
            } else {
                window.go("/fqa", true);
            }

        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#fqa-show-main").html()).replace("{{&gt;", "{{>"));

            e.content = $(tpl({
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