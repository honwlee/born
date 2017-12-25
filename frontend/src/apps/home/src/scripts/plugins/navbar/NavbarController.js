define([
    "jquery",
    "scripts/helpers/Partial",
    "server",
    "handlebars",
    "skylarkjs",
    "scripts/helpers/fueluxComponents"
], function($, partial, server, handlebars, skylarkjs) {
    var spa = skylarkjs.spa,
        __activeIdData = null,
        router = skylarkjs.router;

    window.setActiveRouteIdData = function(data) {
        __activeIdData = data;
    };

    var currentNav,
        currentSubs = {},
        __isDelayed,
        __sitesData,
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

                    router.one("routed", function() {
                        throb.remove();
                        selector.css("opacity", 1);
                    });
                });
        },
        addBreadcrumb = function(name, routes, parentName, id) {
            var rootB = $("#homeBreadcrumb");
            rootB.find("li.main").remove();
            rootB.find("li.sub").remove();
            if (name === "home") return;
            var className = parentName ? "sub" : "main";
            if (id) className = "main";
            var item = routes[name];
            var li = $("<li>").attr({
                class: className + " brc-" + name
            }).html("<a href='" + item.pathto + "'>" + item.data.navName + "</a>");

            if (!id && parentName) {
                var parentItem = routes[parentName];
                $("<li>").attr({
                    class: "main brc-" + parentName
                }).html("<a href='" + parentItem.pathto + "'>" + parentItem.data.navName + "</a>").appendTo(rootB);
            }
            li.appendTo(rootB);
            if (id && id === __activeIdData.id) {
                $("<li>").attr({
                    class: "sub id-item brc-" + parentName
                }).html("<a href='/" + parentName + '/' + id + "'>" + __activeIdData.title + "</a>").appendTo(rootB);
            }
        },
        initItems = function(routes, key, ul) {
            var page = routes[key];
            if (!page.data) return;
            var name = page.data.name,
                navName = page.data.navName,
                path = page.pathto;
            if (page.for === "admin") return;
            if (page.hide) return;
            if (page.sub) return;
            if (page.subs) {
                var li = $("<li>").attr({
                    class: name + "-nav subs dropdown"
                }).addContent(
                    $("<a>").attr({
                        class: "nav-item dropdown-toggle"
                    }).data({
                        name: name,
                        isRouter: page.isRouter == false ? false : true,
                        path: path,
                        toggle: "dropdown"
                    }).html(navName + '<b class="caret"></b>').data("toggle", "dropdown")
                ).appendTo(ul);

                var subUl = $("<ul>").attr({
                    class: "list-unstyled dropdown-menu"
                }).appendTo(li);

                (function(_page, _name, _ul) {
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
                        ).appendTo(_ul);
                    });
                })(page, name, subUl);
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

    function update(data) {
        $("#logo").attr({
            src: data.src,
            title: data.name,
            alt: data.name
        }).removeClass("hide");
        $("#contact").html(data.contact);
        $("#footerTwo").html(data.footer);
        $("meta[name=keyword]").attr("content", data.keyword);
        $("meta[name=description]").attr("content", data.description);
        partial.get("footerLink-partial");
        $("#footerOne").empty().html(handlebars.compile("{{> footerLink-partial}}")({
            snippets: __sitesData.snippets
        }));
        $(".footer").removeClass("hide");
    };

    return spa.PluginController.inherit({

        preparing: function(e) {
            e.result = server().connect("system", "get", "check").then(function(data) {
                __isDelayed = data.checked;
                return server().connect("sites", "get", "config").then(function(data) {
                    __sitesData = data;
                });
            });
        },

        starting: function(evt) {
            var spa = evt.spa,
                // basePath = (spa.getConfig("baseUrl") || "").replace(/.*(\/$)/, ""),
                // routes = spa.getConfig("routes"),
                routes = __sitesData.routes,
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
            router.on("routing", function(e) {
                window._goTop();
            });
            router.on("routed", function(e) {
                var curR = e.current.route;
                var idM = curR.pathto.match(/\/(.*)\/:id$/);

                // update nav dom with active class
                if (curR.name.match(/-/)) {
                    var names = curR.name.split("-");
                    setActive(names[0]);
                    addBreadcrumb(curR.name, routes, names[0]);
                    setSubActive(curR.name, names[0]);
                } else if (idM) {
                    addBreadcrumb(idM[1], routes, idM[1], e.current.params.id);
                    setActive(idM[1]);
                } else {
                    addBreadcrumb(curR.name, routes);
                    setActive(curR.name || "home");
                }
            });
            $(".logo-nav").on("click", function() {
                goToPath("home");
            });
            for (var key in routes) {
                initItems(routes, key, ul);
            }
            partial.get("modal-partial");
            var modal = $("<div>").html(handlebars.compile("{{> modal-partial}}")());
            document.body.appendChild(modal[0]);
            if (__isDelayed) {
                partial.get("error-partial");
                var error = $("<div>").attr({
                    class: "container"
                }).html(handlebars.compile("{{> error-partial}}")({}));
                var contentM = modal.find("#contentModal");
                contentM.find(".modal-body").html(error);
                contentM.find(".modal-title").html("出错啦！");
                contentM.modal("show");
            }
            _el.html(ul);
            if (__sitesData.site && __sitesData.site.id) update(__sitesData.site);
            $(function() {
                $("#mainNav").collapse({
                    toggle: false
                });
                $('ul.nav a.dropdown-toggle').dropdown();
            });
        },
        routed: function() {}
    });
});