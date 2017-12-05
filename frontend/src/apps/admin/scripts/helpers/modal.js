define([
    "skylarkjs",
    "./Partial",
    "jquery",
    "server",
    "toastr",
    "MediumEditor",
    "handlebars"
], function(skylarkjs, partial, $, server, toastr, MediumEditor, handlebars) {
    var __files = {};

    function save(name, selector, opt, callback) {
        var action = "create",
            data = {};
        var formData = new FormData();
        selector.find("input").each(function() {
            if (this.type != "file") {
                var s = $(this);
                formData.append(s.attr("name"), s.val());
                data[s.attr("name")] = s.val();
            }
        });
        selector.find("textarea").each(function() {
            var s = $(this);
            formData.append(s.attr("name"), s.val());
            data[s.attr("name")] = s.val();
        });
        // data.file = file;
        if (data.id) action = "update";
        //将文件信息追加到其中
        if (opt.file) {
            formData.append('file', opt.file);
            //利用split切割，拿到上传文件的格式
            var src = opt.file.name,
                formart = src.split(".")[1];
            //使用if判断上传文件格式是否符合
            if (!(/(gif|jpg|jpeg|png)$/i).test(formart)) {
                return toastr.error("缩略图格式只支持gif、jpg或者png！");
            }
        }
        delete opt.file;
        for (var key in opt) {
            formData.append(key, opt[key]);
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
    var validates = {
        warrantyID: {
            emptyMsg: "质保ID不能为空",
            numsMsg: "用户名不能少于6位",
            numlMsg: "用户名不能多于14位",
            snMsg: "用户名必须以字母开头",
            validateMsg: "用户名不能包含字符",
            check: function(value) {
                var _us = $("#warrantyID");
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
        }
    };
    var modalFuncs = {
        _showForm: function(content, title, opts) {
            var modal = $("#formModal");
            modal.find(".modal-body").html(content);
            modal.find("#datepicker").datepicker();
            var editor = new MediumEditor('.editable', {
                toolbar: {
                    /* These are the default options for the toolbar,
                       if nothing is passed this is what is used */
                    allowMultiParagraphSelection: true,
                    buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
                    diffLeft: 0,
                    diffTop: -10,
                    firstButtonClass: 'medium-editor-button-first',
                    lastButtonClass: 'medium-editor-button-last',
                    relativeContainer: null,
                    standardizeSelectionStart: false,
                    static: false,
                    /* options which only apply when static is true */
                    align: 'center',
                    sticky: false,
                    updateOnEmptySelection: false
                }
            });
            modal.find(".modal-title").html(title);
            modal.find(".save-btn").off("click").on("click", function() {
                var __save = function() {
                    save(opts.key, modal, {
                        file: __files[opts.key]
                    }, function(data) {
                        __files[opts.key] = null;
                        toastr.success("已保存！");
                        if (opts.callback) opts.callback(data);
                        modal.modal('hide');
                    });
                }
                if (validates[opts.key]) {
                    var result = validates[opts.key].check();
                    if (result.error) {
                        toastr.error(result.msg);
                    } else {
                        __save();
                    }
                } else {
                    __save();
                }
            });
            if (opts.file) {
                modal.find(".form input.thumbnail").on("change", function(e) {
                    __files[opts.key] = this.files[0];
                });
            }
            modal.modal('show');
        },
        _showContent: function(content, title) {
            var modal = $("#contentModal");
            modal.find(".modal-body").html(content);
            modal.find(".modal-title").html(title);
            modal.modal('show');
        },
        _showDelete: function(content, title, opts) {
            var modal = $("#confirmDeleteModal");
            modal.find(".modal-title").html(title);
            modal.find(".btn-ok").off("click").on("click", function() {
                server().connect(opts.key, "post", "delete", {
                    id: opts.id
                }).then(function() {
                    if (opts.callback) opts.callback();
                    modal.modal('hide');
                });
            })
            modal.modal('show');
        }
    };

    return {
        show: function(type, content, title, opts) {
            switch (type) {
                case "form":
                    return modalFuncs._showForm(content, title, opts);
                    break;
                case "content":
                    return modalFuncs._showContent(content, title, opts);
                    break;
                default:
                    return modalFuncs._showDelete(content, title, opts);
                    break;
            }
        }
    }
});