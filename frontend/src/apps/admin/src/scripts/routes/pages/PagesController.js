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
    "text!scripts/helpers/_formPartial.hbs"
], function($, skylarkjs, hbs, _, server, toastr, modalFunc, partial, List, formTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        formSelector = $(langx.trim(formTpl));
    partial.get("page-cog-list-item-partial", formSelector);
    partial.get("page-cog-partial", formSelector);
    partial.get("page-form-partial", formSelector);
    var tpl = hbs.compile("{{> page-form-partial}}"),
        cogTpl = hbs.compile("{{> page-cog-partial}}");

    function buildListItem(data) {
        var itemTpl = hbs.compile("{{> page-cog-list-item-partial}}");
        return $(itemTpl(data));
    };

    function bindBtnEvts(type, selector, search) {
        modalFunc.contentListByBtn(selector, {
            key: type,
            search: search,
            listSCallback: function(modal, items, data) {
                toastr.warning("选择完后，需要点击保存按钮！");
                data.items.forEach(function(d) {
                    buildListItem(d).appendTo(selector.find("ul.lists"));
                });
            },
            list_selectable: "multi"
        });
    };

    return spa.RouteController.inherit({
        klassName: "PagesController",
        repeaterId: "pageRepeater",
        list: null,
        preparing: function(e) {
            var self = this;
        },

        buildPopList: function() {

        },

        buildList: function(pages) {
            this.list = new List({
                title: "页面列表",
                id: "pageRepeater",
                key: "pages",
                actions: [{
                    name: "delete",
                    title: "删除页面",
                    tpl: "",
                    callback: function() {

                    }
                }, {
                    name: "show",
                    title: "查看页面",
                    tpl: tpl,
                    callback: function() {

                    }
                }, {
                    name: "edit",
                    title: "编辑页面",
                    tpl: tpl,
                    callback: function() {

                    }
                }, {
                    name: "config",
                    html: '<span class="glyphicon glyphicon-cog"></span> 配置',
                    clickAction: function(helpers, callback, e) {
                        var pageId = helpers.rowData.id;
                        server().connect("pages", "get", "show?key=id&value=" + pageId).then(function(data) {

                            var modal = modalFunc.show("normalForm", "配置页面", $(cogTpl(data)), {
                                modalEvts: function(_modal) {
                                    _modal.off('shown.bs.modal').on('shown.bs.modal', function() {
                                        _modal.find('[data-toggle="tab"]').each(function() {
                                            var $this = $(this);
                                            $this.tab();
                                        });
                                        _modal.find('[data-toggle="dropdown"]').dropdown();
                                    });
                                }
                            });

                            var ps = modal.find("#pSSub")
                            bindBtnEvts("pages", ps, "&search=_sub_");
                            var cs = modal.find("#pSContent");
                            bindBtnEvts("contents", cs);

                            modal.find(".save-btn").off("click").on("click", function() {
                                server().connect("pages", "post", "update", {
                                    id: pageId,
                                    subs: ps.find("li").map(function(i, el) { return $(el).data("id"); }),
                                    contents: cs.find("li").map(function(i, el) { return $(el).data("id"); })
                                }).then(function() {
                                    modal.modal("hide");
                                    toastr.success("保存成功！");
                                });
                            });

                            modal.off('hidden.bs.modal').on('hidden.bs.modal', function() {
                                modalFunc.contentListByBtn(ps, {}, off);
                                modalFunc.contentListByBtn(cs, {}, off);
                                modal.undelegate("i.up", "click");
                                modal.undelegate("i.down", "click");
                            });

                            modal.delegate("i.up", "click", function(e) {
                                var parent = $(this).parent().parent();
                                var before = parent.prev();
                                parent.insertBefore(before);
                            });

                            modal.delegate("i.down", "click", function(e) {
                                var parent = $(this).parent().parent();
                                after = parent.next();
                                parent.insertAfter(after);
                            });
                        });

                    }
                }],
                columns: [{
                    label: '名称',
                    property: 'name',
                    sortbale: true
                }, {
                    label: '标题',
                    property: 'title',
                    sortable: false
                }, {
                    label: '路由',
                    property: 'pathto',
                    sortable: false
                }, {
                    label: '位置',
                    property: 'postion',
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

                modalFunc.show("form", $(tpl()), "添加页面", {
                    key: "pages",
                    callback: function() {
                        selector.repeater('render');
                    },
                    modalEvts: function(_modal) {
                        _modal.off('shown.bs.modal').on('shown.bs.modal', function() {
                            _modal.find('[data-toggle="tab"]').each(function() {
                                var $this = $(this);
                                $this.tab();
                            });
                            _modal.find('[data-toggle="dropdown"]').dropdown();
                        });
                    }
                });
            });
            selector.on('selected.fu.repeaterList', function() {

            });
            selector.find(".repeater-refresh button").off("click").on("click", function(e) {
                selector.repeater('render');
            });
            e.content = this.list.getDom()[0];
        },

        rendered: function() {

        },

        entered: function() {},
        exited: function() {}
    });
});