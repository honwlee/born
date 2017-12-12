define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "lodash",
    "server",
    "toastr",
    "scripts/helpers/modal",
    "scripts/helpers/Partial",
    "scripts/helpers/List",
    "scripts/helpers/tpl",
    "text!scripts/helpers/_formPartial.hbs"
], function($, skylarkjs, hbs, _, server, toastr, modalFunc, partial, List, tplHelper, formTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        formSelector = $(langx.trim(formTpl));
    partial.get("page-select-partial", formSelector);
    partial.get("content-form-partial", formSelector);
    var tpl = hbs.compile("{{> content-form-partial}}"),
        wizardTpl = hbs.compile("{{> wizard-tpl-partial}}");

    var checkActive = function(selector) {
        var result = true;
        result = result && modal.find("input[name=name]").val();
    };
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
                var wizard = $(wizardTpl({
                    id: "contentWizard",
                    steps: [{
                            step: 1,
                            stepBadge: 1,
                            stepLabel: '基本内容',
                            active: true,
                            title: '基本内容',
                            content: $(tpl({
                                pages: self.pages,
                                tpls: tplHelper.tpls
                            })).html()
                        },
                        {
                            step: 2,
                            stepBadge: 2,
                            stepLabel: '模板内容',
                            styles: 'bg-info alert',
                            title: 'Choose Recipients',
                            content: "<form class='tpl-container form-horizontal sub-form'></form>"
                        }
                    ]
                })).wizard();
                var modal = modalFunc.show("form", wizard, "添加slide", {
                    key: "contents",
                    file: true,
                    callback: function() {
                        selector.repeater('render');
                    }
                });
                wizard.on('finished.fu.wizard', function() {
                    modalFunc.save("contents", modal, {
                        _file: __file
                    }, function(data) {
                        __file = null;
                        toastr.success("已保存！");
                    });
                });
                modal.off('shown.bs.modal').on('shown.bs.modal', function() {
                    modal.find("#tpl").off("change").on("change", function() {
                        var value = this.value;

                        if (value) {
                            wizard.wizard("next");
                            var container = modal.find(".tpl-container");
                            $(tplHelper.getForm(value)()).appendTo(container.empty());
                            modalFunc.bindFormEvnts(container, {
                                key: "contents",
                                file: true
                            });
                        }
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