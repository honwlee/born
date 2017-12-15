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
    partial.get("link-form-partial", formSelector);
    var tpl = hbs.compile("{{> link-form-partial}}");
    return spa.RouteController.inherit({
        klassName: "LinksController",
        repeaterId: "linksRepeater",
        list: null,

        buildList: function(post) {
            this.list = new List({
                title: "链接列表",
                id: this.repeaterId,
                key: "links",
                actions: [{
                    name: "delete",
                    title: "删除",
                    tpl: "",
                    callback: function() {

                    }
                }],
                columns: [{
                    label: '名称',
                    property: 'name',
                    sortable: true
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
                })), "添加链接", {
                    list_selectable: "multi",
                    key: "links",
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