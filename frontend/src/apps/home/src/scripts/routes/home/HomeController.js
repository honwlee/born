define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "scripts/helpers/tplHelper",
    "text!scripts/routes/home/home.hbs"
], function($, skylarkjs, hbs, server, tplHelper, homeTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        selector = $(langx.trim(homeTpl));

    return spa.RouteController.inherit({
        klassName: "HomeController",
        pageData: null,
        preparing: function(e) {
            var self = this;
            e.result = server().connect("pages", "get", "show?key=name&&value=" + e.route.name).then(function(data) {
                self.pageData = data;
            });
        },

        rendering: function(e) {
            var tpl = hbs.compile(langx.trim(selector.find("#home-main").html()).replace("{{&gt;", "{{>")),
                self = this,
                _ec = $(tpl({}));
            if (this.pageData) {
                self.pageData.contents.forEach(function(content) {
                    tplHelper.show(content.tpl, content.sub, content).appendTo(_ec.find(".pages"));
                });
            }
            e.content = _ec[0];
        },

        rendered: function() {

        },

        entered: function() {},
        exited: function() {}
    });
});