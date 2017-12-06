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
                editTile: "编辑页面",
                deleteTitle: "删除页面",
                key: "pages",
                data: pages,
                hbsFormTpl: tpl,
                hbsItemTpl: tpl,
                dataSource: function(options, callback) {
                    // set options
                    var pageIndex = options.pageIndex;
                    var pageSize = options.pageSize;
                    var options = {
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        sortDirection: options.sortDirection,
                        sortBy: options.sortProperty,
                        filterBy: options.filter.value || '',
                        searchBy: options.search || ''
                    };

                    server().connect("pages", "get", "index").then(function(data) {
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
                            },{
                                label: '标题',
                                property: 'title',
                                sortable: false
                            },{
                                label: '页面内容',
                                property: 'content',
                                sortable: false
                            }, {
                                label: '发布时间',
                                property: 'publishedDate',
                                sortable: true
                            }
                            // , {
                            //     label: '创建时间',
                            //     property: 'createdDate',
                            //     sortable: false
                            // }
                        ],
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