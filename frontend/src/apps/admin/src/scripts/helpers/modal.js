define([
    "skylarkjs",
    "./Partial",
    "./SimpleMdeEditor",
    "jquery",
    "server",
    "toastr",
    "handlebars",

], function(skylarkjs, partial, SimpeMdeEditor, $, server, toastr, handlebars) {
    var __files = {},
        langx = skylarkjs.langx,
        __smdeIds = {},
        __repeaterSelectedItems = [],
        __content = {};

    function parseForm(selector) {
        var data = {}
        selector.find("input").each(function() {
            if (this.type == "file") return;
            var s = $(this),
                val = s.val();
            if (this.type === "checkbox") val = s.is(":checked");
            if (s.attr("name")) data[s.attr("name")] = val;
        });
        selector.find("select").each(function() {
            var s = $(this);
            if (s.hasClass("hide")) return;
            if (s.attr("name")) data[s.attr("name")] = s.val();
        });
        selector.find("textarea").each(function() {
            var s = $(this),
                smdeId = s.attr("smdeId"),
                value;
            if (smdeId) {
                // var edit = __smdeIds[smdeId].edit;
                // value = edit.markdown(edit.value());
                var um = __smdeIds[smdeId];
                value = um.getContent();
                delete __smdeIds[smdeId];
            } else {
                value = s.val();
            }
            if (s.attr("name")) data[s.attr("name")] = value;
        });
        return data;
    };

    function save(name, selector, extralObj, callback, actionName) {
        var action = actionName || "create",
            data = {};
        var formData = new FormData();
        var parseData = parseForm(selector);
        langx.mixin(data, parseData);

        for (var key in parseData) {
            formData.append(key, parseData[key]);
        }
        if (data.id) action = "update";
        //将文件信息追加到其中
        if (extralObj._file) {
            formData.append('file', extralObj._file);
            //利用split切割，拿到上传文件的格式
            var filename = extralObj._file.name;
            //使用if判断上传文件格式是否符合
            if (!(/\.(gif|jpg|jpeg|png)$/i).test(filename)) {
                return toastr.error("缩略图格式只支持gif、jpg或者png！");
            }
        }
        delete extralObj._file;
        if (extralObj._content) {
            formData.append("_content", JSON.stringify(extralObj._content));
        }
        delete extralObj._content;
        for (var key in extralObj) {
            formData.append(key, extralObj[key]);
        }

        var url = "/api/" + name + "/" + action;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var result = JSON.parse(xhr.response || xhr.responseText);
                    if (result.status) {
                        callback(result.result);
                    } else {
                        if (result.auth) {
                            toastr.error("未登录或者session失效，请登录后再操作！");
                            window.go("/sigin");
                        } else if (result.validate) {
                            toastr.error("数据已存在：(" + result.key + ":" + result.value + ")");
                        } else {
                            toastr.error("系统错误，请截图并联系管理员，谢谢合作！");
                        }
                    }
                } else {
                    toastr.error("系统错误，请请截图并联系管理员，谢谢合作！");
                    // selector.modal('hide');
                }
            }
        };
        xhr.send(formData);
    };

    function buildList(obj, opts, callback, actionName) {
        // opts: {search, list_selectable}
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

    function formatDate(date, split, moment) {
        var split = split || "-",
            padTwo = function(value) {
                var s = '0' + value;
                return s.substr(s.length - 2);
            };
        moment = moment || this.moment;
        if (this.moment) {
            return moment(date).format(this.momentFormat);
        } else {
            return date.getFullYear() + split + padTwo(date.getMonth() + 1) + split + padTwo(date.getDate());
        }
    };

    function showList(formModal, type, opts, actionName) {
        // opts: {search, list_selectable, key, listSCallback}
        var data = {
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
                    label: '图片',
                    property: 'src',
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
            },
            links: {
                type: "links",
                title: "选择链接内容",
                id: "selectLinktListR",
                columns: [{
                    label: '名称',
                    property: 'name',
                    sortable: true
                }],
                fields: ["id"]
            }
        }
        var cmodal = $("#chooseModal");
        cmodal.find(".modal-title").html(data[type].title);
        cmodal.off('hidden.bs.modal').on('hidden.bs.modal', function() {
            __repeaterSelectedItems = [];
        });
        buildList(data[type], opts, function(list) {
            var s = list.getDom();

            s.on("selected.fu.repeaterList", function(e, data) {
                var item_data = $(data).data("item_data");
                if (item_data) __repeaterSelectedItems.push(item_data);
            })

            s.on("deselected.fu.repeaterList", function(e, data) {
                var item_data = $(data).data("item_data");
                _.remove(__repeaterSelectedItems, function(item) {
                    return item.id == item_data.id;
                });
            });
            s.on("rendered.fu.repeater", function() {
                s.repeater('list_setSelectedItems', __repeaterSelectedItems.map(function(item) {
                    return { property: 'id', value: item.id };
                }), true);
            });

            cmodal.find(".modal-body").html(s);
            cmodal.find(".save-btn").off("click").on("click", function() {
                var items = __repeaterSelectedItems;
                if (items.length) {
                    var formatData = __content[opts.key] = {
                        type: type,
                        items: items.map(function(item) {
                            var ret = {};
                            data[type].fields.forEach(function(f) {
                                ret[f] = item[f];
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
        cmodal.modal('show');
    };

    var __validates = {
        name: {
            emptyMsg: "名称不能为空",
            numsMsg: "用户名不能少于6位",
            numlMsg: "用户名不能多于14位",
            snMsg: "用户名必须以字母开头",
            validateMsg: "用户名不能包含字符",
            check: function(modal) {
                var _us = modal.find("input[name=name]");
                if (!_us.val()) {
                    //     if (value.length < 6) {
                    //         _us.focus();
                    //         return { error: true, msg: this.numsMsg };
                    //     }
                    //     if (value.length > 14) {
                    //         _us.focus();
                    //         return { error: true, msg: this.numlMsg };
                    //     }
                    //     if (!value.match(/^[a-zA-Z0-9]+$/)) {
                    //         _us.focus();
                    //         return { error: true, msg: this.validateMsg };
                    //     }
                    //     if (value.match(/^[^a-zA-Z]/)) {
                    //         _us.focus();
                    //         return { error: true, msg: this.snMsg };
                    //     }
                    // } else {
                    _us.focus();
                    return { error: true, msg: this.emptyMsg };
                }
                return { error: false };
            }
        },
        title: {
            emptyMsg: "标题不能为空",
            check: function(modal) {
                var _us = modal.find("input[name=title]");
                if (!_us.val()) {
                    _us.focus();
                    return { error: true, msg: this.emptyMsg };
                }
                return { error: false };
            }
        }
    };

    function contentListBySelect(selector, opts, off) {
        selector.find("select.muti-content").each(function() {
            var s = $(this);
            s.off("change");
            if (!off) s.on("change", function() {
                var value = this.value;
                server().connect(value, "get", "select").then(function(data) {
                    // opts: {search, list_selectable, key, listSCallback}
                    showList(selector, value, {
                        search: opts.search ? opts.search : false,
                        list_selectable: opts.list_selectable || "multi",
                        listSCallback: opts.listSCallback
                    });
                });
            });
        });
    };

    function contentListByBtn(selector, opts, off) {
        var _s = selector.find("button.select-content-list");
        _s.off("click");
        if (off) return;
        _s.on("click", function(e) {
            var data = $(e.currentTarget).data();
            // opts: {search, list_selectable, key, listSCallback}
            showList(selector, data.type, {
                search: opts.search ? opts.search : false,
                list_selectable: opts.list_selectable || "multi",
                listSCallback: opts.listSCallback
            }, data.action);
        });
    };

    function toggleRelated(selector) {
        selector.find("select.related").each(function() {
            var s = $(this),
                related = s.data("related");
            if (related) {
                var r = related.split("@");
                var subSC = $(r[0]);
                s.off("change").on("change", function() {
                    if (this.value === r[1]) {
                        server().connect(r[2], "get", "select").then(function(data) {
                            var subS = subSC.find("select").empty();
                            data.forEach(function(d) {
                                $("<option>").attr({
                                    value: d.id
                                }).text(d.title).appendTo(subS);
                            });
                            subSC.removeClass("hide").find("select").removeClass("hide");
                        });
                    } else {
                        subSC.addClass("hide").find("select").addClass("hide");
                    }
                })
            }
        });
    };

    function bindFormEvnts(modal, opts, off) {
        contentListBySelect(modal, opts, off);
        toggleRelated(modal);
        contentListByBtn(modal, opts, off);

        var smde = modal.find("#simplemde");
        if (smde[0]) {
            var _id = langx.uid(__smdeIds);
            // __smdeIds[_id] = new SimpeMdeEditor({
            //     selector: modal.find("#simplemde")[0]
            // });
            __smdeIds[_id] = UM.getEditor("simplemde");

            smde.attr("smdeId", _id);
        }
    };

    function checkForm(keys, modal, validates) {
        validates = validates || __validates;
        var status = true;
        for (var i in keys) {
            var key = keys[i];
            if (validates[key]) {
                var result = validates[key].check(modal);
                if (result.error) {
                    toastr.error(result.msg);
                    status = false;
                    break;
                } else {
                    continue;
                }
            } else {
                continue;
            }
        };
        return status;
    };

    var modalFuncs = {
        buildList: buildList,
        _showForm: function(content, title, opts) {
            var modal = $("#formModal");
            opts.file = opts.file === false ? false : true;
            modal.find(".modal-body").empty().html(content);
            modal.find(".modal-title").empty().html(title);

            modal.off('shown.bs.modal').on('shown.bs.modal', function() {
                var editorC = modal.find(".textarea-editable");
                var size = editorC.size();
                if (size) {
                    editorC.find(".edui-container").css({
                        width: size.width + 'px',
                        overflow: "hidden"
                    });
                    editorC.find(".editable").css({
                        width: size.width + 'px',
                        overflowX: 'hidden',
                        overflowY: 'auto'
                    });
                }
            });

            modal.find("#datepickerIllustration").datepicker({
                allowPastDates: true,
                formatDate: formatDate
            });
            modal.find(".save-btn").off("click").on("click", function() {
                var extralObj = {
                    _content: __content[opts.key],
                    _file: __files[opts.key]
                };
                if (opts.beforeSave) opts.beforeSave(extralObj);
                if (checkForm(opts.checkKeys || [], modal)) {
                    save(opts.key, modal, extralObj, function(data) {
                        __content[opts.key] = null;
                        __files[opts.key] = null;
                        toastr.success("已保存！");
                        if (opts.afterSave) opts.afterSave(data);
                        modal.modal('hide');
                    }, opts.action);
                }
            });

            if (opts.file) {
                modal.find(".form input.file").on("change", function(e) {
                    __files[opts.key] = this.files[0];
                });
            }
            if (opts.bindFormEvnts != false) bindFormEvnts(modal, opts);
            if (opts.modalEvts) opts.modalEvts(modal);
            modal.modal({
                backdrop: "static",
                show: true
            });
            return modal;
        },

        _showNormalForm: function(content, title, opts) {
            var modal = $("#formModal");
            modal.find(".modal-title").empty().html(title);
            modal.find(".modal-body").empty().html(content);
            if (opts && opts.modalEvts) opts.modalEvts(modal);
            modal.modal({
                backdrop: "static",
                show: true
            });
            return modal;
        },

        _showContent: function(content, title) {
            var modal = $("#contentModal");
            modal.find(".modal-body").empty().html(content);
            modal.find(".modal-title").empty().html(title);
            modal.modal('show');
            return modal;
        },
        _showDelete: function(content, title, opts) {
            var modal = $("#confirmDeleteModal");
            modal.find(".modal-title").empty().html(title);
            modal.find(".btn-ok").off("click").on("click", function() {
                server().connect(opts.key, "post", "delete", {
                    id: opts.id
                }).then(function() {
                    if (opts.callback) opts.callback();
                    modal.modal('hide');
                });
            })
            modal.modal('show');
            return modal;
        }
    };

    return {
        formatDate: formatDate,
        contentListByBtn: contentListByBtn,
        contentListBySelect: contentListBySelect,
        parseForm: parseForm,
        addValidate: function(key, opts) {
            __validates[key] = opts;
        },
        checkForm: checkForm,
        bindFormEvnts: bindFormEvnts,
        save: save,
        show: function(type, content, title, opts) {
            var modal;
            switch (type) {
                case "form":
                    modal = modalFuncs._showForm(content, title, opts);
                    break;
                case "content":
                    modal = modalFuncs._showContent(content, title, opts);
                    break;
                case "normalForm":
                    modal = modalFuncs._showNormalForm(content, title, opts);
                    break;
                default:
                    modal = modalFuncs._showDelete(content, title, opts);
                    break;
            }
            modal.find(".btn-full").off("click").on("click", function() {
                var s = $(this);
                if (s.hasClass("full")) {
                    s.removeClass("full");
                    s.text("全屏");
                    modal.removeClass("fullscreen");
                } else {
                    s.addClass("full");
                    s.text("取消全屏");
                    modal.addClass("fullscreen");
                }
            });
            return modal;
        }
    }
});