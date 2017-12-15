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
        __file = {},
        __currentTplKey = null,
        wizardTpl = hbs.compile("{{> wizard-tpl-partial}}");

    function bindCurrentTplEvts(modal, key) {
        if (__currentTplKey) {
            tplHelper.getTplByKey(__currentTplKey).bindEvnts(container, __currentTplKey, true);
        }
        var container = modal.find(".tpl-container").empty();
        $(tplHelper.getForm(key)()).appendTo(container.empty());
        modalFunc.bindFormEvnts(container, {
            key: "contents",
            file: true
        });
        var tplObj = tplHelper.getTplByKey(key);
        __currentTplKey = key;
        tplObj.bindEvnts(container);
        modal.find(".save-btn").off("click").on("click", function() {
            tplObj.save(modal);
        });
    }

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
                var obj = {
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
                            }))[0].outerHTML,
                            beforeAction: function(e, _modal) {
                                if (!modalFunc.checkForm(["name"], _modal)) {
                                    e.preventDefault();
                                }
                            }
                        },
                        {
                            step: 2,
                            stepBadge: 2,
                            stepLabel: '模板内容',
                            styles: 'bg-info alert',
                            title: '',
                            content: "<form class='tpl-container form-horizontal sub-form'></form>",
                            afterAction: function(e, _modal) {

                            }
                        }
                    ]
                };
                var wizard = $(wizardTpl(obj)).wizard();
                modal = modalFunc.show("normalForm", wizard, "添加slide", {
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
                }).on('actionclicked.fu.wizard', function(e, data) {
                    var config = obj.steps.filter(function(s) { return s.step === data.step; })[0];
                    if (config.beforeAction) config.beforeAction(e, modal);
                }).on('changed.fu.wizard', function(e, data) {
                    var config = obj.steps.filter(function(s) { return s.step === data.step; })[0];
                    if (config.afterAction) config.afterAction(e, modal);
                });

                modal.find("#tpl").off("change").on("change", function() {
                    if (this.value) {
                        bindCurrentTplEvts(modal, this.value);
                        wizard.wizard("next");
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