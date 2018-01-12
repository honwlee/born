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
        __file,
        __currentTplKey = null,
        wizardTpl = hbs.compile("{{> wizard-tpl-partial}}");
    return spa.RouteController.inherit({
        klassName: "ContentsController",
        repeaterId: "contentsRepeater",
        list: null,
        title: "页面模板内容列表",
        addTitle: "添加页面模板内容",
        postAction: "create",
        actionName: "index",
        preparing: function(e) {
            var self = this;
            e.result = server().connect("pages", "get", "select").then(function(pages) {
                self.pages = pages;
            });
        },

        buildList: function(post) {
            var list = this.list = new List({
                title: "模板内容",
                id: this.repeaterId,
                key: "contents",
                actionName: this.actionName,
                actions: [{
                        name: "delete",
                        title: "删除模板",
                        tpl: "",
                        callback: function() {

                        }
                    }
                    // , {
                    //     name: "edit",
                    //     title: "编辑",
                    //     tpl: tpl,
                    //     clickAction: function(helpers, callback, e) {
                    //         var _data = langx.mixin(langx.clone(helpers.rowData), {});
                    //         if (_data.publishedDate) _data.publishedDate = formatDate(_data.publishedDate);
                    //         modalFunc.show("form", $(opts.tpl(_data)), "编辑页面内容", {
                    //             key: "contents",
                    //             file: true,
                    //             afterSave: function() {
                    //                 list.getDom().repeater('render');
                    //             }
                    //         });
                    //     }
                    // }
                ],
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
            __file = null;
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
                                tpls: tplHelper.tpls.filter(function(tpl) { return tpl.category === self.actionName; })
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
                var wizard = $(wizardTpl(obj)).wizard(),
                    modal = modalFunc.show("form", wizard, this.addTitle, {
                        key: "contents",
                        file: true,
                        modalShownEvts: function(_modal) {
                            var saveBtn = _modal.find(".save-btn").prop("disabled", true);
                            _modal.find("#tpl").off("change").on("change", function() {
                                __file = null;
                                if (this.value) {
                                    var key = this.value;
                                    var container = _modal.find(".tpl-container");
                                    if (__currentTplKey) {
                                        // 清除事件监听
                                        tplHelper.getTplByKey(__currentTplKey).bindEvnts(_modal, container, true);
                                    }
                                    __currentTplKey = key;
                                    $(tplHelper.getForm(key)()).appendTo(container.empty());
                                    // 处理form显示内容，比如初始化编辑器等
                                    modalFunc.bindFormEvnts(container, {
                                        key: "contents",
                                        file: true
                                    });
                                    container.find("input.file").on("change", function(e) {
                                        var type = $(e.currentTarget).data("type");
                                        __file = this.files[0];
                                    });
                                    saveBtn.prop("disabled", false);
                                    wizard.wizard("next");
                                    var tplObj = tplHelper.getTplByKey(__currentTplKey);
                                    // 准备上传数据
                                    tplObj.bindEvnts(_modal, container);
                                }
                            });
                        },

                        modalHidenEvts: function(_modal) {
                            __file = null;
                            __currentTplKey = null;
                        },

                        modalClickOkEvts: function(_modal) {
                            var container = _modal.find(".tpl-container");
                            var tplObj = tplHelper.getTplByKey(__currentTplKey);
                            // 上传
                            tplObj.save(_modal, {
                                _file: __file
                            }, self.postAction).then(function(result) {
                                if (result) selector.repeater('render');
                            });
                        }
                    });
                wizard.on('finished.fu.wizard', function() {
                    modalFunc.save("contents", modal, {
                        _file: __file
                    }, function(data) {
                        modal.modal("hide");
                        selector.repeater('render');
                        toastr.success("已保存！");
                    }, this.postAction);
                }).on('actionclicked.fu.wizard', function(e, data) {
                    var config = obj.steps.filter(function(s) { return s.step === data.step; })[0];
                    if (config.beforeAction) config.beforeAction(e, modal);
                }).on('changed.fu.wizard', function(e, data) {
                    var config = obj.steps.filter(function(s) { return s.step === data.step; })[0];
                    if (config.afterAction) config.afterAction(e, modal);
                });

                // modal.find("input[name=name]").on("change", function() {
                //     modal.find("#tpl").prop("disabled", false);
                // });


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