define([
    "jquery",
    "skylarkjs",
    "./List",
    "./server"
], function($, skylarkjs, List, server) {

    function buildList(obj, opts, callback, actionName) {
        require(["scripts/helpers/List"], function(List) {
            var list = new List({
                title: obj.title,
                id: obj.id,
                actionName: actionName,
                search: opts.search,
                list_selectable: opts.list_selectable,
                key: obj.type,
                addBtn: false,
                multiView: false,
                columns: obj.columns
            });
            callback(list);
        });
    };

    var listScheme = {
        posts: {
            type: "posts",
            title: "选择文章列表",
            id: "selectPostListR",
            columns: [{
                label: '标题',
                property: 'title',
                sortable: false
            }],
            fields: ["id"]
        },
        pages: {
            type: "pages",
            title: "选择子页面",
            id: "selectSubPageListR",
            columns: [{
                label: '名称',
                property: 'name',
                sortable: false
            }],
            fields: ["id", "name"]
        },
        contents: {
            type: "contents",
            title: "选择模板内容",
            id: "selectContentListR",
            columns: [{
                label: '名称',
                property: 'name',
                sortable: false
            }],
            fields: ["id", "name"]
        },
        news: {
            type: "news",
            title: "选择新闻列表",
            id: "selectNewsListR",
            columns: [{
                label: '标题',
                property: 'title',
                sortable: false
            }],
            fields: ["id"]
        },
        qas: {
            type: "qas",
            title: "选择问答列表",
            id: "selectQaListR",
            columns: [{
                label: '标题',
                property: 'title',
                sortable: true
            }],
            fields: ["id"]
        },
        photos: {
            type: "photos",
            title: "选择图片列表",
            id: "selectPostListR",
            columns: [{
                label: '名称',
                property: 'name',
                sortable: true
            }],
            fields: ["id", "description", "src", "name"]
        },
        snippets: {
            type: "snippets",
            title: "选择段内容",
            id: "selectSnippetListR",
            columns: [{
                label: '标题',
                property: 'title',
                sortable: true
            }],
            fields: ["id"]
        }
    };

    function showListModal(formModal, type, opts, actionName) {
        var data = listScheme;
        var cmodal = $("#chooseModal");
        cmodal.find(".modal-title").html(data[type].title);
        cmodal.off('shown.bs.modal').on('shown.bs.modal', function() {
            buildList(data[type], opts, function(list) {
                var s = list.getDom();
                cmodal.find(".modal-body").html(s);
                cmodal.find(".save-btn").off("click").on("click", function() {
                    var items = s.repeater('list_getSelectedItems');
                    if (items.length) {
                        var formatData = __content[opts.key] = {
                            type: type,
                            items: items.map(function(item) {
                                var ret = {};
                                data[type].fields.forEach(function(f) {
                                    ret[f] = item.data[f];
                                });
                                return ret;
                            })
                        };
                        cmodal.modal("hide");
                        if (opts.listSCallback) opts.listSCallback(formModal, items, formatData);
                    } else {
                        toastr.warning("请选择一项！");
                    }

                });
            }, actionName);
        });
        cmodal.modal('show');
    };

    function showList(type) {
        buildList(listScheme[type], opts, function(list) {
            var s = list.getDom();
            cmodal.find(".modal-body").html(s);
            cmodal.find(".save-btn").off("click").on("click", function() {
                var items = s.repeater('list_getSelectedItems');
                if (items.length) {
                    var formatData = __content[opts.key] = {
                        type: type,
                        items: items.map(function(item) {
                            var ret = {};
                            data[type].fields.forEach(function(f) {
                                ret[f] = item.data[f];
                            });
                            return ret;
                        })
                    };
                    cmodal.modal("hide");
                    if (opts.listSCallback) opts.listSCallback(formModal, items, formatData);
                } else {
                    toastr.warning("请选择一项！");
                }

            });
        }, actionName);
    };

    return {
        build: buildList,
        showModal: showListModal
    }
});