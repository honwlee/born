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

    function bindCurrentTplEvts(modal, key, callback, actionName) {
        var container = modal.find(".tpl-container");
        if (__currentTplKey) {
            // 清除事件监听
            tplHelper.getTplByKey(__currentTplKey).bindEvnts(modal, container, true);
        }
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
        var tplObj = tplHelper.getTplByKey(key);
        __currentTplKey = key;
        // 准备上传数据
        tplObj.bindEvnts(modal, container);
        modal.find(".save-btn").off("click").on("click", function() {
            // 上传
            tplObj.save(modal, {
                _file: __file
            }, actionName);
            callback();
        });
    }

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
            this.list = new List({
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
                }, {
                    override: true,
                    name: 'edit',
                    html: '<span class="glyphicon glyphicon-edit"></span> 编辑',
                    clickAction: function(helpers, callback, e) {
                        opts.tplOpts = opts.tplOpts || {};
                        var _data = langx.mixin(langx.clone(helpers.rowData), opts.tplOpts);
                        modal.show("form", $(opts.tpl(_data)), opts.title, {
                            key: opts.key,
                            file: true,
                            callback: function() {
                                opts.container.repeater('render');
                                if (opts.callback) opts.callback();
                            }
                        });
                    }
                }],
                columns: [{
                    label: '名称',
                    property: 'name',
                    sortable: true
                }, {
                    label: '所属页面',
                    property: 'category',
                    sortable: false
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
                                tpls: tplHelper.tpls.filter(function(tpl) { return tpl.category === this.actionName; })
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
                    modal = modalFunc.show("normalForm", wizard, this.addTitle, {
                        key: "contents",
                        file: true,
                        callback: function() {

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

                modal.find("#tpl").off("change").on("change", function() {
                    __file = null;
                    if (this.value) {
                        bindCurrentTplEvts(modal, this.value, function() {
                            toastr.success("已保存！");
                            selector.repeater('render');
                        }, self.postAction);
                        wizard.wizard("next");
                    }
                });
                modal.off('hidden.bs.modal').on('hidden.bs.modal', function() {
                    __file = null;
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
})