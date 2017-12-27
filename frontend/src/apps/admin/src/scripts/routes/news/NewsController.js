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
        itemSelector = $(langx.trim(itemTpl)),
        formSelector = $(langx.trim(formTpl));

    partial.get("news-form-partial", formSelector);
    partial.get("news-item-partial", itemSelector);
    var tpl = hbs.compile("{{> news-form-partial}}");
    var itemT = hbs.compile("{{> news-item-partial}}");
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
                    name: "edit",
                    title: "编辑",
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
                }],
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
                })), "添加新闻", {
                    key: "news",
                    file: true,
                    afterSave: function() {
                        selector.repeater('render');
                    },
                    checkKeys: ["title", "abstract"]
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