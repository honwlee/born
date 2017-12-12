define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "toastr",
    "scripts/helpers/modal",
    "text!scripts/routes/home/home.hbs"
], function($, skylarkjs, hbs, server, toastr, modalFunc, homeTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        __file = null;
    return spa.RouteController.inherit({
        klassName: "HomeController",
        site: null,
        preparing: function(e) {
            var self = this;
            e.result = server().connect("sites", "get", "show").then(function(site) {
                self.site = site;
            });
        },
        rendering: function(e) {
            var selector = $(langx.trim(homeTpl));
            var tpl = hbs.compile(langx.trim(selector.find("#home-manage-partial").html()).replace("{{&gt;", "{{>"));
            var ec = $(tpl(this.site));
            e.content = ec;
            ec.find(".form input.file").on("change", function(e) {
                __file = this.files[0];
            });
            ec.find("button.save-btn").off("click").on("click", function() {
                modalFunc.save("sites", ec, {
                    _file: __file
                }, function(data) {
                    __file = null;
                    toastr.success("已保存！");
                });
            });
        },

        entered: function() {},
        exited: function() {}
    });
});