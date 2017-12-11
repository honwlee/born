define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "lodash",
    "server",
    "scripts/helpers/modal",
    "scripts/helpers/Partial",
    "scripts/helpers/List",
    "text!scripts/helpers/_formPartial.hbs"
], function($, skylarkjs, hbs, _, server, modal, partial, List, formTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        formSelector = $(langx.trim(formTpl));
    partial.get("page-select-partial", formSelector);
    partial.get("grid-form-partial", formSelector);
    var tpl = hbs.compile("{{> grid-form-partial}}");
    return spa.RouteController.inherit({
        klassName: "GridsController",
        repeaterId: "gridsRepeater",
        list: null,
        preparing: function(e) {
            var self = this;
            e.result = server().connect("pages", "get", "select").then(function(pages) {
                self.pages = pages;
            });
        },

        buildList: function(post) {
            this.list = new List({
                title: "图片列表",
                id: this.repeaterId,
                key: "grids",
                actions: [{
                    name: "delete",
                    title: "删除Grid",
                    tpl: "",
                    callback: function() {

                    }
                }],
                columns: [{
                    label: '名称',
                    property: 'name',
                    sortable: true
                }, {
                    label: '所属页面',
                    property: 'page',
                    sortable: false
                }]
            });
        },

        addPage: function() {

        },

        rendering: function(e) {
            this.buildList();
            var self = this,
                selector = this.list.getDom();
            selector.find(".repeater-add button").off("click").on("click", function(e) {
                modal.show("form", $(tpl({
                    pages: self.pages
                })), "添加文章", {
                    list_selectable: "multi",
                    key: "grids",
                    file: true,
                    callback: function() {
                        selector.repeater('render');
                    },
                    listSCallback: function(modal, items) {

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