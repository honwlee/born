define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "text!scripts/routes/home/_pages.hbs",
    "text!scripts/routes/home/home.hbs"
], function($, skylarkjs, hbs, pagesTpl, homeTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        pageSelector = $(langx.trim(pagesTpl)),
        selector = $(langx.trim(homeTpl));
    var banners = [];
    [1, 2, 3, 4, 5].forEach(function(i) {
        banners.push({
            name: "banner" + i,
            imgUrl: "/assets/images/wap_new/banner0" + i + ".jpg"
        });
    });
    var pages = [];
    [1, 2, 3, 4, 5, 6, 7].forEach(function(j) {
        var name = "home-page" + j + "-partial";
        hbs.registerPartial(name, langx.trim(pageSelector.find("#" + name).html()).replace(/\{\{&gt;/g, "{{>"));
        var tpl = hbs.compile("{{> " + name + "}}");
        pages.push({
            html: tpl()
        });
    });
    return spa.RouteController.inherit({
        klassName: "HomeController",
        preparing: function(e) {

        },

        rendering: function(e) {
            var tpl = hbs.compile(langx.trim(selector.find("#home-main").html()).replace("{{&gt;", "{{>")),
                self = this,
                _ec = $(tpl({
                    pages: pages,
                    banners: banners
                }));
            e.content = _ec[0];
        },

        rendered: function() {

        },

        entered: function() {},
        exited: function() {}
    });
});
