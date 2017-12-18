define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "scripts/helpers/tplHelper",
    "text!scripts/routes/service/service.hbs"
], function($, skylarkjs, hbs, server, tplHelper, serviceTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        selector = $(langx.trim(serviceTpl));
    return spa.RouteController.inherit({
        klassName: "ServiceController",
        pageData: null,
        preparing: function(e) {
            var self = this;
            e.result = server().connect("pages", "get", "show?key=name&&value=" + e.route.name).then(function(data) {
                self.pageData = data;
            });
        },

        rendering: function(e) {
            var tpl = hbs.compile(langx.trim(selector.find("#service-main").html()).replace("{{&gt;", "{{>")),
                self = this,
                _ec = $(tpl({}));
            self.pageData.contents.forEach(function(content) {
                tplHelper.show(content.tpl, content.sub).appendTo(_ec.find(".container-service"));
            });
            e.content = _ec[0];
        },
        entered: function() {},
        exited: function() {}
    });
});