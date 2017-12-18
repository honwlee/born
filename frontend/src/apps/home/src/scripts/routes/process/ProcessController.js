define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "scripts/helpers/tplHelper",
    "text!scripts/routes/process/process.hbs"
], function($, skylarkjs, hbs, server, tplHelper, processTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        selector = $(langx.trim(processTpl));
    var spa = skylarkjs.spa;
    return spa.RouteController.inherit({
        klassName: "ProcessController",
        pageData: null,
        preparing: function(e) {
            var self = this;
            e.result = server().connect("pages", "get", "show?key=name&&value=process").then(function(data) {
                self.pageData = data;
            });
        },
        rendering: function(e) {
            var tpl = hbs.compile(langx.trim(selector.find("#process-main").html()).replace("{{&gt;", "{{>")),
                self = this,
                _ec = $(tpl({}));
            if (self.pageData) {
                self.pageData.contents.forEach(function(content) {
                    var tplData = tplHelper.data[content.tpl];
                    tplHelper.show(content.tpl, content.sub).appendTo(_ec.find("#" + tplData.domId));
                });
            }
            e.content = _ec[0];
        },

        rendered: function() {
            $('#pTabList a[href="#pProcess"]').tab('show');
            $("#pTabList").find('a').off('shown.bs.tab').on('shown.bs.tab', function(e) {
                var path = $(e.currentTarget).data("path");
                window.go(path, true);
            });
            $('[data-toggle="tab"]').each(function() {
                var $this = $(this);
                $this.tab();
            });
            $('[data-toggle="dropdown"]').dropdown();
        },
        exited: function() {}
    });
});