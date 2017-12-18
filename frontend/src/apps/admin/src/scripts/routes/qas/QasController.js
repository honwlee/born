define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "lodash",
    "server",
    "scripts/helpers/modal",
    "scripts/helpers/Partial",
    "scripts/helpers/List",
    "text!scripts/helpers/_formPartial.hbs",
    "text!scripts/helpers/_itemPartial.hbs"
], function($, skylarkjs, hbs, _, server, modal, partial, List, formTpl, itemTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        formSelector = $(langx.trim(formTpl)),
        itemSelector = $(langx.trim(itemTpl));
    partial.get("qa-form-partial", formSelector);
    partial.get("qa-item-partial", itemSelector);
    var tpl = hbs.compile("{{> qa-form-partial}}");
    var itemT = hbs.compile("{{> qa-item-partial}}");
    return spa.RouteController.inherit({
        klassName: "QaController",
        repeaterId: "QaRepeater",
        list: null,
        preparing: function(e) {
            var self = this;
        },

        buildList: function() {
            this.list = new List({
                title: "文章列表",
                id: "qaRepeater",
                key: "qas",
                actions: [{
                    name: "delete",
                    title: "删除文章",
                    callback: function() {

                    }
                }, {
                    name: "show",
                    title: "查看文章",
                    tpl: itemT,
                    callback: function() {

                    }
                }, {
                    name: "edit",
                    title: "编辑文章",
                    tpl: tpl,
                    callback: function() {

                    }
                }],
                columns: [{
                    label: '标题',
                    property: 'title',
                    sortable: false
                }, {
                    label: '内容摘要',
                    property: 'abstract',
                    sortable: false
                }, {
                    label: '是否公开',
                    property: 'published',
                    sortable: false
                }, {
                    label: '发布时间',
                    property: 'publishedDate',
                    sortable: true
                }, {
                    label: '创建时间',
                    property: 'createdAt',
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
                    checked: true
                })), "添加问答", {
                    key: "qas",
                    file: true,
                    afterSave: function() {
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