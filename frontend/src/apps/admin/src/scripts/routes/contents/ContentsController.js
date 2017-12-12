define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "lodash",
    "server",
    "scripts/helpers/modal",
    "scripts/helpers/Partial",
    "scripts/helpers/List",
    "scripts/helpers/tpl",
    "text!scripts/helpers/_formPartial.hbs"
], function($, skylarkjs, hbs, _, server, modalFunc, partial, List, tplHelper, formTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        formSelector = $(langx.trim(formTpl));
    partial.get("page-select-partial", formSelector);
    partial.get("content-form-partial", formSelector);
    var tpl = hbs.compile("{{> content-form-partial}}");
    return spa.RouteController.inherit({
        klassName: "ContentsController",
        repeaterId: "contentsRepeater",
        list: null,
        preparing: function(e) {
            var self = this;
            e.result = server().connect("pages", "get", "select").then(function(pages) {
                self.pages = pages;
            });
        },

        buildList: function(post) {
            this.list = new List({
                title: "模板内容",
                id: this.repeaterId,
                key: "contents",
                actions: [{
                    name: "delete",
                    title: "删除模板",
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
                var modal = modalFunc.show("form", $(tpl({
                    pages: self.pages,
                    tpls: tplHelper.tpls
                })), "添加slide", {
                    key: "contents",
                    file: true,
                    callback: function() {
                        selector.repeater('render');
                    }
                });
                modal.off('shown.bs.modal').on('shown.bs.modal', function() {
                    modal.find("#tpl").off("change").on("change", function() {
                        var value = this.value;
                        if (value) $(tplHelper.getForm(value)()).appendTo(modal.find("#contentForm .tpl-container").empty());
                    });
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