define([
    "jquery",
    "skylarkjs",
    "skylarkBs",
    "handlebars",
    "lodash",
    "server",
    "scripts/helpers/modal",
    "scripts/helpers/Partial",
    "scripts/helpers/List",
    "text!scripts/helpers/_formPartial.hbs"
], function($, skylarkjs, sbs, hbs, _, server, modal, partial, List, formTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        formSelector = $(langx.trim(formTpl));
    partial.get("date-picker-partial");
    partial.get("page-cog-partial", formSelector);
    partial.get("page-form-partial", formSelector);
    var tpl = hbs.compile("{{> page-form-partial}}");
    return spa.RouteController.inherit({
        klassName: "PagesController",
        repeaterId: "pageRepeater",
        list: null,
        preparing: function(e) {
            var self = this;
        },

        buildList: function(pages) {
            this.list = new List({
                title: "页面列表",
                id: "pageRepeater",
                key: "pages",
                actions: [{
                    name: "delete",
                    title: "删除页面",
                    tpl: "",
                    callback: function() {

                    }
                }, {
                    name: "show",
                    title: "查看页面",
                    tpl: tpl,
                    callback: function() {

                    }
                }, {
                    name: "edit",
                    title: "编辑页面",
                    tpl: tpl,
                    callback: function() {

                    }
                }, {
                    name: "config",
                    html: '<span class="glyphicon glyphicon-cog"></span> 编辑',
                    clickAction: function(helpers, callback, e) {
                        modal.show("form", $(opts.tpl(helpers.rowData)), opts.title, {
                            key: opts.key,
                            callback: function() {
                                container.repeater('render');
                                if (opts.callback) opts.callback();
                            }
                        });
                    }
                }],
                dataSource: function(options, callback) {
                    // set options
                    var pageIndex = options.pageIndex;
                    var pageSize = options.pageSize;
                    var options = {
                        limit: pageSize,
                        direction: options.sortDirection,
                        sort: options.sortProperty,
                        filter: options.filter.value || '',
                        search: options.search || ''
                    };
                    var action = "index?page=" + options.page;
                    for (var key in options) {
                        if (options.key) action = action + "&&" + key + "=" + options[key];
                    }

                    server().connect("pages", "get", action).then(function(data) {
                        var items = data.rows;
                        var totalItems = data.total;
                        var totalPages = Math.ceil(totalItems / pageSize);
                        var startIndex = (pageIndex * pageSize) + 1;
                        var endIndex = (startIndex + pageSize) - 1;

                        if (endIndex > items.length) {
                            endIndex = items.length;
                        }

                        // configure datasource
                        var dataSource = {
                            page: pageIndex,
                            pages: totalPages,
                            count: totalItems,
                            start: startIndex,
                            end: endIndex,
                            columns: [{
                                label: '名称',
                                property: 'name',
                                sortbale: false
                            }, {
                                label: '标题',
                                property: 'title',
                                sortable: false
                            }, {
                                label: '路由',
                                property: 'pathto',
                                sortable: false
                            }, {
                                label: '位置',
                                property: 'postion',
                                sortable: false
                            }],
                            items: items
                        };

                        // invoke callback to render repeater
                        callback(dataSource);
                    });
                }
            });
        },

        addPage: function() {

        },

        rendering: function(e) {
            this.buildList();
            var self = this,
                selector = this.list.getDom();
            selector.find(".repeater-add button").off("click").on("click", function(e) {
                modal.show("form", $(tpl()), "添加页面", {
                    key: "pages",
                    callback: function() {
                        selector.repeater('render');
                    }
                });
            });
            selector.find(".repeater-refresh button").off("click").on("click", function(e) {
                selector.repeater('render');
            });
            e.content = this.list.getDom()[0];
        },

        entered: function() {},
        exited: function() {}
    });
});