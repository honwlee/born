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
    partial.get("photo-form-partial", formSelector);
    var tpl = hbs.compile("{{> photo-form-partial}}");
    return spa.RouteController.inherit({
        klassName: "PhotoController",
        repeaterId: "photoRepeater",
        list: null,
        preparing: function(e) {
            var self = this;
        },

        buildList: function(post) {
            this.list = new List({
                thumbnail_template: '<div class="thumbnail repeater-thumbnail" style="background: {{color}};"><img height="75" src="{{src}}" width="65"><span>{{name}}</span></div>',
                thumbnail_selectable: true,
                title: "图片列表",
                id: "photoRepeater",
                key: "photos",
                actions: [{
                    name: "delete",
                    title: "删除页面",
                    tpl: "",
                    callback: function() {

                    }
                }],
                dataSource: function(options, callback) {
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

                    server().connect("photos", "get", action).then(function(data) {
                        var items = data.rows;
                        var totalItems = data.total;
                        var totalPosts = Math.ceil(totalItems / pageSize);
                        var startIndex = (pageIndex * pageSize) + 1;
                        var endIndex = (startIndex + pageSize) - 1;

                        if (endIndex > items.length) {
                            endIndex = items.length;
                        }

                        // configure datasource
                        var dataSource = {
                            page: pageIndex,
                            pages: totalPosts,
                            count: totalItems,
                            start: startIndex,
                            end: endIndex,
                            columns: [],
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
                modal.show("form", $(tpl()), "添加文章", {
                    key: "photos",
                    file: true,
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