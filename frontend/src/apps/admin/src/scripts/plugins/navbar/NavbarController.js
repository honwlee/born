define([
    "jquery",
    "scripts/helpers/Partial",
    "handlebars",
    "server",
    "skylarkjs",
    "scripts/helpers/fueluxComponents"
], function($, partial, handlebars, server, skylarkjs) {
    var spa = skylarkjs.spa,
        router = skylarkjs.router,
        __isDelayed,
        basePath = (spa().getConfig("baseUrl") || "");
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
                                isRouter: subPage.isRouter == false ? false : true,
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
                        isRouter: page.isRouter == false ? false : true,
                        path: path
                    }).html(navName)
                ).appendTo(ul);
            }
        },
        skylarkBsExts = function() {
            $.fn.repeater.Constructor.prototype.list_createItemActions = function listCreateItemActions() {
                var actionsHtml = '';
                var self = this;
                var i;
                var length;
                var $table = this.$element.find('.repeater-list .repeater-list-wrapper > table');
                var $actionsTable = this.$canvas.find('.table-actions');

                for (i = 0, length = this.viewOptions.list_actions.items.length; i < length; i++) {
                    var action = this.viewOptions.list_actions.items[i];
                    var html = action.html;

                    actionsHtml += '<li><a href="javascript:void(0)" data-action="' + action.name + '" class="action-item"> ' + html + '</a></li>';
                }

                var actionsDropdown = '<div class="btn-group">' +
                    '<button type="button" class="btn btn-xs btn-default dropdown-toggle repeater-actions-button" data-toggle="dropdown" data-flip="auto" aria-expanded="false">' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu dropdown-menu-right" role="menu">' +
                    actionsHtml +
                    '</ul></div>';

                if ($actionsTable.length < 1) {
                    var $actionsColumnWrapper = $('<div class="actions-column-wrapper" style="width: ' + this.list_actions_width + 'px"></div>').insertBefore($table);
                    var $actionsColumn = $table.clone().addClass('table-actions');
                    $actionsColumn.find('th:not(:last-child)').remove();
                    $actionsColumn.find('tr td:not(:last-child)').remove();

                    // Dont show actions dropdown in header if not multi select
                    if (this.viewOptions.list_selectable === 'multi' || this.viewOptions.list_selectable === 'action') {
                        $actionsColumn.find('thead tr').html('<th><div class="repeater-list-heading">' + actionsDropdown + '</div></th>');

                        if (this.viewOptions.list_selectable !== 'action') {
                            // disable the header dropdown until an item is selected
                            $actionsColumn.find('thead .btn').attr('disabled', 'disabled');
                        }
                    } else {
                        var label = this.viewOptions.list_actions.label || '<span class="actions-hidden">a</span>';
                        $actionsColumn.find('thead tr').addClass('empty-heading').html('<th>' + label + '<div class="repeater-list-heading">' + label + '</div></th>');
                    }

                    // Create Actions dropdown for each cell in actions table
                    var $actionsCells = $actionsColumn.find('td');

                    $actionsCells.each(function addActionsDropdown(rowNumber) {
                        $(this).html(actionsDropdown);
                        $(this).find('a').attr('data-row', rowNumber + 1);
                    });

                    $actionsColumnWrapper.append($actionsColumn);

                    this.$canvas.addClass('actions-enabled');
                }

                this.list_sizeActionsTable();

                // row level actions click
                this.$element.find('.table-actions tbody .action-item').on('click', function onBodyActionItemClick(e) {
                    if (!self.isDisabled) {
                        var actionName = $(this).data('action');
                        var row = $(this).data('row');
                        var selected = {
                            actionName: actionName,
                            rows: [row]
                        };
                        self.list_getActionItems(selected, e);
                    }
                });
                // bulk actions click
                this.$element.find('.table-actions thead .action-item').on('click', function onHeadActionItemClick(e) {
                    if (!self.isDisabled) {
                        var actionName = $(this).data('action');
                        var selected = {
                            actionName: actionName,
                            rows: []
                        };
                        var selector = '.repeater-list-wrapper > table .selected';

                        if (self.viewOptions.list_selectable === 'action') {
                            selector = '.repeater-list-wrapper > table tr';
                        }
                        self.$element.find(selector).each(function eachSelector(selectorIndex) {
                            selected.rows.push(selectorIndex + 1);
                        });

                        self.list_getActionItems(selected, e);
                    }
                });
            };
        };

    return spa.PluginController.inherit({

        preparing: function(e) {
            e.result = server().connect("system", "get", "check").then(function(data) {
                __isDelayed = data.checked;
            });
        },
        starting: function(evt) {
            var spa = evt.spa,
                routes = spa.getConfig("routes"),
                _el = $("#sk-navbar"),
                goToPath = function(name) {
                    server().connect("auth", "get", "check").then(function(result) {
                        if (result) {
                            var path = routes[name].pathto;
                            if (router.go(path)) {
                                // 监听routed已经实现
                                // setActive(name);
                                showThrob();
                            }
                        } else {
                            window.go("/signin");
                        }
                    });
                };
            var ul = $("<ul>").attr({
                class: "nav navbar-nav"
            }).delegate(".nav-item", "click", function(e) {
                var target = $(e.target),
                    data = target.data();
                if (!data.isRouter) return;
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
            [{
                key: "logout",
                href: "/logout",
                name: "退出"
            }].forEach(function(item) {
                $("<li>").attr({
                    class: item.key + "-nav"
                }).html("<a class='nav-item' data-spa-router='false' href='" + item.href + "'>" + item.name + "</a>").appendTo(ul);
            });

            _el.html(ul);
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
            modal.find(".modal .modal-dialog").css("width", "800px");
            skylarkBsExts();
            $(function() {
                $("#mainNav").collapse({
                    toggle: false
                });
                $('ul.nav a.dropdown-toggle').dropdown();
                $('ul.nav li.dropdown').hover(function() {
                    $(this).find('.dropdown-menu').stop(true, true).fadeIn(500, 200);
                }, function() {
                    $(this).find('.dropdown-menu').stop(true, true).fadeOut(500, 200);
                });
            });
        },
        routed: function() {}
    });
});