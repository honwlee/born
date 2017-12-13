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
                modal.show("form", $(tpl()), "添加新闻", {
                    key: "news",
                    file: true,
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