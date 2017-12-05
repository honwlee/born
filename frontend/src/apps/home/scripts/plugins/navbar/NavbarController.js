define([
    "jquery",
    "scripts/helpers/Partial",
    "handlebars",
    "skylarkjs"
], function($, partial, handlebars, skylarkjs) {
    var spa = skylarkjs.spa,
        router = skylarkjs.router;
    var currentNav,
        currentSubs = {},
        setActive = function(name) {
            if (currentNav) $(currentNav).removeClass("active");
            currentNav = $("." + name + "-nav");
            if (currentNav) currentNav.addClass("active");
        },
        setSubActive = function(subName, parentName) {
            var sub = currentSubs[parentName];
            if (sub) sub._s.removeClass("active");
            currentSubs[parentName] = {
                _s: $("." + subName + "-nav").addClass("active"),
                name: subName
            };
        },
        showThrob = function() {
            var selector = $("#mainWrapper"),
                throb = window.addThrob(selector[0], function() {
                    router.one("routing", function(e) {
                        window._goTop();
                    });
                    router.one("routed", function() {
                        throb.remove();
                        selector.css("opacity", 1);
                    });
                });
        },
        initItems = function(routes, key, ul) {
            var page = routes[key],
                name = page.data.name,
                navName = page.data.navName,
                path = page.pathto;
            if (page.for === "admin") return;
            if (page.hide) return;
            if (page.sub) return;
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

                (function(_page, _name, _div) {
                    _page.subs.forEach(function(sub) {
                        var subPage = routes[sub],
                            subData = subPage.data;
                        $("<li>").attr({
                            class: "sub-nav " + subData.name + "-nav"
                        }).addContent(
                            $("<a>").attr({
                                class: "nav-item"
                            }).data({
                                name: subData.name,
                                sub: true,
                                parent: _name,
                                path: subPage.pathto
                            }).html(subData.navName)
                        ).appendTo(_div.find("ul"));
                    });
                })(page, name, div);
            } else {
                $("<li>").attr({
                    class: name + "-nav "
                }).addContent(
                    $("<a>").attr({
                        class: "nav-item"
                    }).data({
                        name: name,
                        path: path
                    }).html(navName)
                ).appendTo(ul);
            }
        };

    return spa.PluginController.inherit({
        starting: function(evt) {
            var spa = evt.spa,
                // basePath = (spa.getConfig("baseUrl") || "").replace(/.*(\/$)/, ""),
                routes = spa.getConfig("routes"),
                _el = $("#sk-navbar"),
                goToPath = function(name) {
                    var path = routes[name].pathto;
                    if (router.go(path)) {
                        // 监听routed已经实现
                        // setActive(name);
                        showThrob();
                    }
                };
            var ul = $("<ul>").attr({
                class: "nav navbar-nav"
            }).delegate(".nav-item", "click", function(e) {
                var target = $(e.target),
                    data = target.data();
                if (data.sub) {
                    goToPath(data.name);
                } else {
                    var sub = currentSubs[data.name];
                    if (sub) {
                        // 跳转到上次打开的二级导航
                        goToPath(sub.name);
                    } else {
                        goToPath(data.name);
                    }
                }
            });
            router.on("routed", function(e) {
                var curR = e.current.route;
                // update nav dom with active class
                if (curR.name.match(/-/)) {
                    var names = curR.name.split("-");
                    setActive(names[0]);
                    setSubActive(curR.name, names[0]);
                } else {
                    setActive(curR.name || "home");
                }
            });
            $(".logo-nav").on("click", function() {
                goToPath("home");
            });
            for (var key in routes) {
                initItems(routes, key, ul);
            }
            _el.html(ul);
            partial.get("gallery-partial");
            var div = $("<div>").html(handlebars.compile("{{> gallery-partial}}")({}));
            document.body.appendChild(div[0].firstChild);
        },
        routed: function() {}
    });
});