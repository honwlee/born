define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "simplemde",
    "server",
    "./data",
    "text!scripts/routes/fqa/qa.hbs"
], function($, skylarkjs, hbs, SimpleMDE, server, data, template) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "PostsShowController",
        qa: null,
        preparing: function(e) {
            var self = this,
                id = e.route.getNamedValue()[1];
            e.result = server().connect("qas", "get", "show?id=" + id).then(function(qa) {
                self.qa = qa;
            });
        },
        rendering: function(e) {
            var selector = $(langx.trim(template));
            var tpl = hbs.compile(langx.trim(selector.find("#fqa-show-main").html()).replace("{{&gt;", "{{>"));

            e.content = $(tpl({
                id: this.qa.id,
                title: this.qa.title,
                abstract: this.qa.abstract,
                imgUrl: this.qa.src,
                date: new Date(this.qa.publishedDate).toISOString().substring(0, 10)
            }));
            var simplemde = new SimpleMDE({
                element: e.content.find("textarea")[0]
            });
            e.content.find(".post_overview").html(simplemde.markdown(this.qa.content));
            simplemde.toTextArea();
            simplemde = null;
        },

        entered: function() {

        },
        exited: function() {}
    });
});