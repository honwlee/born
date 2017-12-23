define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "simplemde",
    "server",
    "text!scripts/routes/fqa/qa.hbs"
], function($, skylarkjs, hbs, SimpleMDE, server, template) {
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
                    self.qa = qa;
                });
            } else {
                window.getComputedStyle("/fqa", true);
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

        entered: function() {

        },
        exited: function() {}
    });
});