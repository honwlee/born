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
    partial.get("snippets-form-partial", formSelector);
    var tpl = hbs.compile("{{> snippets-form-partial}}");
    return spa.RouteController.inherit({
        klassName: "SnippetsController",
        repeaterId: "snippetsRepeater",
        list: null,
        title: "流程列表",
        addTitle: "添加流程",
        snippetTplOpts: {
            needContent: true,
            needDescription: true,
            isNormalContent: true,
            needCover: true
        },
        preparing: function(e) {
            var self = this;
        },

        buildList: function() {
            this.list = new List({
                title: this.title,
                id: this.repeaterId,
                actionName: this.actionName,
                key: "snippets",
                actions: [{
                    name: "delete",
                    title: "删除",
                    callback: function() {

                    }
                }, {
                    name: "show",
                    title: "查看",
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
                    label: '简介',
                    property: 'description',
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
                modal.show("form", $(tpl(self.snippetTplOpts)), this.addTitle, {
                    key: "snippets",
                    action: self.actionName ? "post_" + self.actionName : "create",
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