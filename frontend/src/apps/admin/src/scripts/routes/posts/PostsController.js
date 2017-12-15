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
    partial.get("post-form-partial", formSelector);
    partial.get("post-item-partial", itemSelector);
    var tpl = hbs.compile("{{> post-form-partial}}");
    var itemT = hbs.compile("{{> post-item-partial}}");
    return spa.RouteController.inherit({
        klassName: "PostController",
        repeaterId: "postRepeater",
        list: null,
        preparing: function(e) {
            var self = this;
        },

        buildList: function(post) {
            this.list = new List({
                title: "文章列表",
                id: "postRepeater",
                key: "posts",
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
                modal.show("form", $(tpl()), "添加文章", {
                    key: "posts",
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