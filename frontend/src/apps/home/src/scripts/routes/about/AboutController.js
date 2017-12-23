define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "scripts/helpers/tplHelper",
    "text!scripts/routes/about/about.hbs"
], function($, skylarkjs, hbs, server, tplHelper, aboutTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        selector = $(langx.trim(aboutTpl));
    var spa = skylarkjs.spa;
    return spa.RouteController.inherit({
        klassName: "AboutController",
        pageData: null,
        currentId: "aAbout",
        preparing: function(e) {
            var self = this;
            e.result = server().connect("pages", "get", "show?key=name&&value=about").then(function(data) {
                self.pageData = data;
            });
        },
        rendering: function(e) {
            var tpl = hbs.compile(langx.trim(selector.find("#about-main").html()).replace("{{&gt;", "{{>")),
                self = this,
                _ec = $(tpl({
                    banner: self.pageData.banner
                }));
            if (self.pageData) {
                self.pageData.contents.forEach(function(content) {
                    var tplData = tplHelper.data[content.tpl];
                    tplHelper.show(content.tpl, content.sub).appendTo(_ec.find("#" + tplData.domId));
                });
            }
            e.content = _ec[0];
        },

        rendered: function() {
            $('#aTabList a[href="#' + this.currentId + '"]').tab('show');
            $("#aTabList").find('a').off('shown.bs.tab').on('shown.bs.tab', function(e) {
                var path = $(e.currentTarget).data("path");
                window.go(path, true);
            });
            $('[data-toggle="tab"]').each(function() {
                var $this = $(this);
                $this.tab();
            });
            $('[data-toggle="dropdown"]').dropdown();
        },
        entered: function() {},
        exited: function() {}
    });
});