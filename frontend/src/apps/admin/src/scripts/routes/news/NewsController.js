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
    partial.get("news-form-partial", formSelector);
    var tpl = hbs.compile("{{> news-form-partial}}");
    return spa.RouteController.inherit({
        klassName: "NewsController",
        repeaterId: "newsRepeater",
        list: null,
        preparing: function(e) {
            var self = this;
        },

        buildList: function(news) {
            this.list = new List({
                title: "新闻列表",
                id: "newsRepeater",
                key: "news",
                actions: [{
                    name: "delete",
                    title: "删除新闻",
                    tpl: "",
                    callback: function() {

                    }
                }, {
                    name: "show",
                    title: "查看新闻",
                    tpl: tpl,
                    callback: function() {

                    }
                }, {
                    name: "edit",
                    title: "编辑",
                    tpl: tpl,
                    callback: function() {

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

                    server().connect("news", "get", action).then(function(data) {
                        var items = data.rows;
                        var totalItems = data.total;
                        var totalnewss = Math.ceil(totalItems / pageSize);
                        var startIndex = (pageIndex * pageSize) + 1;
                        var endIndex = (startIndex + pageSize) - 1;

                        if (endIndex > items.length) {
                            endIndex = items.length;
                        }

                        // configure datasource
                        var dataSource = {
                            page: pageIndex,
                            pages: totalnewss,
                            count: totalItems,
                            start: startIndex,
                            end: endIndex,
                            columns: [{
                                label: '标题',
                                property: 'title',
                                sortable: false
                            }, {
                                label: '新闻内容',
                                property: 'content',
                                sortable: false
                            }, {
                                label: '发布时间',
                                property: 'publishedDate',
                                sortable: true
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
                modal.show("form", $(tpl()), "添加新闻", {
                    key: "news",
                    callback: function() {

                    }
                });
            });
            selector.find(".repeater-refresh button").off("click").on("click", function(e) {
                selector.repeater('render')
            });
            e.content = this.list.getDom()[0];
        },

        entered: function() {},
        exited: function() {}
    });
});