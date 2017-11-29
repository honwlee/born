define([
    "jquery",
    "skylarkjs"
], function($, skylarkjs) {
    var spa = skylarkjs.spa,
        router = skylarkjs.router;
    var currentNav,
        setActive = function(selector) {
            if (currentNav) $(currentNav).removeClass("active");
            currentNav = $("." + selector + "-nav");
            if (currentNav) currentNav.addClass("active");
        },
        showThrob = function() {
            var selector = $("#main"),
                throb = window.addThrob(selector[0], function() {
                    router.one("routing", function(e) {
                        window._goTop();
                    });
                    router.one("routed", function() {
                        throb.remove();
                        selector.css("opacity", 1);
                    });
                });
        };
    return spa.PluginController.inherit({
        starting: function(evt) {
            var spa = evt.spa,
                basePath = spa.getConfig("baseUrl"),
                routes = spa.getConfig("routes"),
                _el = $("#sk-navbar"),
                navClick = function(path, name) {
                    if (router.go(path)) {
                        setActive(name);
                        showThrob();
                    }
                };
            var ul = $("<ul>").attr({
                class: "nav navbar-nav"
            }).delegate(".nav-item", "click", function(e) {
                var target = $(e.target),
                    data = target.data();
                navClick(data.path, data.name);
            });
            router.one("routed", function(e) {
                var curR = e.current.route;
                setActive(curR.name);
            });
            var selector = $("#main-wrap");
            $(".logo-nav").on("click", function() {
                navClick("/", "home");
            });
            for (var key in routes) {
                var page = routes[key],
                    name = page.data.name,
                    navName = page.data.navName,
                    path = basePath + page.pathto;

                if (page.subs) {
                    var li = $("<li>").attr({
                        class: name + "-nav subs"
                    }).addContent(
                        $("<a>").attr({
                            class: "nav-item"
                        }).data({
                            name: name,
                            path: path
                        }).html(navName)
                    ).appendTo(ul);
                    var div = $("<div>").attr({
                        class: "sameOne"
                    }).appendTo(li).html("<ul class='list-unstyled'></ul>");
                    page.subs.forEach(function(sub) {
                        var subPage = routes[sub],
                            subData = subPage.data;
                        $("<li>").attr({
                            class: "sub-nav"
                        }).addContent(
                            $("<a>").attr({
                                class: "nav-item"
                            }).data({
                                name: subData.name,
                                path: subPage.pathto
                            }).html(subData.navName)
                        ).appendTo(div.find("ul"));
                    });
                } else {
                    $("<li>").attr({
                        class: name + "-nav"
                    }).addContent(
                        $("<a>").attr({
                            class: "nav-item"
                        }).data({
                            name: name,
                            path: path
                        }).html(navName)
                    ).appendTo(ul);
                }
            }
            _el.html(ul);
        },
        routed: function() {}
    });
});
