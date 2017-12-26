define([
    "skylarkjs",
], function(skylarkjs) {
    var spa = skylarkjs.spa,
        noder = skylarkjs.noder,
        langx = skylarkjs.langx,
        router = skylarkjs.router;
    window.__isDelayed = null;
    window.__sitesData = null;

    function update(config, $) {
        if (config.slide) {
            var homeSlide = $("#homeSlide"),
                ol = homeSlide.find(".carousel-indicators").empty(),
                inner = homeSlide.find(".carousel-inner").empty();
            config.slide.forEach(function(s, index) {
                var className = index ? "" : "active";
                $('<li data-target="#carousel-generic" data-slide-to="' +
                    index + '" class="' +
                    className + '"></li>').appendTo(ol);
                var div = $("<div>").attr({
                    class: "item " + className
                }).appendTo(inner);
                $("<a>").attr({
                    class: "banner-bg carousel-item",
                    href: s.link,
                    target: "_blank",
                    style: "background-image: url(" + s.src.replace(/\\/g, "/") + ")"
                }).appendTo(div);
            });
            $('<div class="left carousel-control" href="#carousel-generic" data-slide="prev">' +
                '<span class="glyphicon glyphicon-chevron-left"></span>' +
                '</div>').appendTo(inner);
            $('<div class="right carousel-control" href="#carousel-generic" data-slide="next">' +
                '<span class="glyphicon glyphicon-chevron-right"></span>' +
                '</div>').appendTo(inner);
            homeSlide.removeClass("hide");
        }
        if (config.site && config.site.id) {
            var data = config.site;
            $("#logo").attr({
                src: data.src,
                title: data.name,
                alt: data.name
            }).removeClass("hide");
            $("#contact").html(data.contact);
            $("#footerTwo").html(data.footer);
            $("meta[name=keyword]").attr("content", data.keyword);
            $("meta[name=description]").attr("content", data.description);
        }
        if (config.snippets) {
            var footer = $("#footerOne .innerCon").empty();
            config.snippets.forEach(function(sn) {
                var sDiv = $("<div>").attr({
                    class: "text-center same"
                }).html("<h5>" + sn.title + "</h5>").appendTo(footer);
                sn.links.forEach(function(l) {
                    if (l.src) {
                        $("<a>").attr({
                            target: "_blank",
                            href: l.link
                        }).html('<img src="' + l.src + '">').appendTo(sDiv);
                    } else {
                        $("<a>").attr({
                            target: "_blank",
                            href: l.link,
                            class: "text-overflow"
                        }).html(l.name).appendTo(sDiv);
                    }

                });
            });
        }
        $(".footer").removeClass("hide");
    };

    return spa.PluginController.inherit({
        klassName: "AppController",
        _showProcessing: function() {
            if (!this._throbber) {
                this._throbber = noder.throb(document.body);
            }

        },
        _hideProcessing: function() {
            if (this._throbber) {
                this._throbber.remove();
                this._throbber = null;
            }
        },

        preparing: function(e) {
            var deferred = new langx.Deferred();
            window.formatDate = function(d, split) {
                d = d || new Date();
                split = split || "-";
                var padTwo = function(value) {
                        var s = '0' + value;
                        return s.substr(s.length - 2);
                    },
                    date = new Date(d);
                return date.getFullYear() + split + padTwo(date.getMonth() + 1) + split + padTwo(date.getDate());
            };
            window._goTop = function(time) {
                time = time || 200;
                $([document.body, document.documentElement]).animate({
                    "scrollTop": 0
                }, time, function() {
                    goTopShown = false;
                });
                $(".go-top-btn").css({
                    opacity: 0
                }).hide();
            };
            window.addThrob = function(node, callback, opacity) {
                node.style.opacity = opacity === 0 ? 0 : opacity || 0.5;
                var throb = noder.throb(node, {});
                callback();
                return throb;
            };
            var goTop = function(selector) {
                var goTopShown = false;
                selector.css({
                    opacity: 0
                }).on("click", function() {
                    window._goTop();
                });

                $(window).scroll(function() {
                    if (goTopShown && window.scrollY > 0) return;
                    if (window.scrollY > 100) {
                        selector.css({
                            opacity: 1
                        }).show();
                        goTopShown = true;
                    } else {
                        selector.css({
                            opacity: 0
                        }).hide();
                        goTopShown = false;
                    }
                });
            };
            var main = skylarkjs.finder.find("#mainWrapper");
            if (main) {
                throb = window.addThrob(main, function() {
                    require(["jquery"], function($) {
                        // require(["skylarkBs"], function() {
                        require([
                            "server",
                            "skylarkSwt/carousel"
                        ], function(server) {
                            server().connect("system", "get", "check").then(function(data) {
                                window.__isDelayed = data.checked;
                                return server().connect("sites", "get", "config").then(function(data) {
                                    window.__sitesData = data;
                                    update(data, $);

                                    $(function() {
                                        $('.carousel').carousel();
                                    });
                                    main.style.opacity = 1;
                                    throb.remove();
                                    deferred.resolve();
                                });
                            });

                            goTop($(".go-top-btn"));
                            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                                $("#sk-navbar").delegate(".nav-item", "click", function(e) {
                                    $('#sk-navbar').collapse('hide');
                                });
                                $(".logo-nav").on("click", function() {
                                    $('#sk-navbar').collapse('hide');
                                })
                                $(".navbar").addClass("navbar-default");
                            }
                            // });
                        });
                    });
                });
            }
            e.result = deferred.promise;
        },

        starting: function(e) {
            this._showProcessing();
        },
        started: function(e) {
            this._hideProcessing();
        }
    });
});