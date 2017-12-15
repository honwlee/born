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
    partial.get("category-form-partial", formSelector);
    var tpl = hbs.compile("{{> category-form-partial}}");
    return spa.RouteController.inherit({
        klassName: "CategoriesController",
        repeaterId: "categoriesRepeater",
        list: null,

        buildList: function(post) {
            this.list = new List({
                title: "分类列表",
                id: this.repeaterId,
                key: "categories",
                actions: [{
                    name: "delete",
                    title: "删除",
                    tpl: "",
                    callback: function() {

                    }
                }, {
                    name: "edit",
                    title: "编辑",
                    tpl: tpl,
                    callback: function() {

                    }
                }],
                columns: [{
                    label: '名称',
                    property: 'name',
                    sortable: true
                }, {
                    label: 'usage',
                    property: 'usage',
                    sortable: false
                }]
            });
        },

        rendering: function(e) {
            this.buildList();
            var self = this,
                selector = this.list.getDom();
            selector.find(".repeater-add button").off("click").on("click", function(e) {
                modal.show("form", $(tpl({
                    pages: self.pages
                })), "添加分类", {
                    list_selectable: "multi",
                    key: "categories",
                    file: true,
                    afterSave: function() {
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