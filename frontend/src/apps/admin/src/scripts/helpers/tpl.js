define([
    "skylarkjs",
    "./Partial",
    "jquery",
    "server",
    "toastr",
    "./modal",
    "handlebars",
    "./tplHelper.js",
    "text!./_tplPartials.hbs"
], function(skylarkjs, partial, $, server, toastr, modalFunc, hbs, tplHelper, template) {
    var langx = skylarkjs.langx,
        __content = {},
        d = tplHelper.data;

    return {
        tpls: [{
                name: "page1",
                cnName: d.page1.cnName,
                bindEvnts: function(selector, off) {
                    modalFunc.contentListByBtn(selector, {
                        key: "contents",
                        listSCallback: function(modal, items, data) {
                            __content.page1 = langx.clone(data);
                        },
                        list_selectable: "multi"
                    }, off);
                },
                save: function(selector) {
                    var parseData = modalFunc.parseForm(selector.find(".sub-form"));
                    parseData._content = __content.page1;
                    __content.page1 = null;

                    if (modalFunc.checkForm(["name"], modal)) {
                        modalFunc.save("contents", selector.find(".form"), {
                            sub: JSON.stringify(parseData)
                        }, function(data) {
                            toastr.success("已保存！");
                            modal.modal('hide');
                        });
                    }
                }
            }, {
                name: "page2",
                cnName: d.page2.cnName,
                bindEvnts: function(selector, off) {
                    modalFunc.contentListByBtn(selector, {
                        key: "contents",
                        listSCallback: function(modal, items, data) {
                            __content.page1 = langx.clone(data);
                        },
                        list_selectable: "multi"
                    }, off);
                },
                save: function(selector) {
                    var parseData = modalFunc.parseForm(selector.find(".sub-form"));
                    parseData._content = __content.page1;
                    __content.page1 = null;

                    if (modalFunc.checkForm(["name"], modal)) {
                        modalFunc.save("contents", selector.find(".form"), {
                            sub: JSON.stringify(parseData)
                        }, function(data) {
                            toastr.success("已保存！");
                            modal.modal('hide');
                        });
                    }
                }
            },
            {
                name: "page3",
                cnName: d.page3.cnName,
                bindEvnts: function(selector, off) {
                    modalFunc.contentListByBtn(selector, {
                        key: "contents",
                        listSCallback: function(modal, items, data) {
                            __content.page1 = langx.clone(data);
                        },
                        list_selectable: "multi"
                    }, off);
                },
                save: function(selector) {
                    var parseData = modalFunc.parseForm(selector.find(".sub-form"));
                    parseData._content = __content.page1;
                    __content.page1 = null;

                    if (modalFunc.checkForm(["name"], modal)) {
                        modalFunc.save("contents", selector.find(".form"), {
                            sub: JSON.stringify(parseData)
                        }, function(data) {
                            toastr.success("已保存！");
                            modal.modal('hide');
                        });
                    }
                }
            },
            {
                name: "page4",
                cnName: d.page4.cnName,
                bindEvnts: function(selector, off) {
                    modalFunc.contentListByBtn(selector, {
                        key: "contents",
                        listSCallback: function(modal, items, data) {
                            __content.page1 = langx.clone(data);
                        },
                        list_selectable: "multi"
                    }, off);
                },
                save: function(selector) {
                    var parseData = modalFunc.parseForm(selector.find(".sub-form"));
                    parseData._content = __content.page1;
                    __content.page1 = null;

                    if (modalFunc.checkForm(["name"], modal)) {
                        modalFunc.save("contents", selector.find(".form"), {
                            sub: JSON.stringify(parseData)
                        }, function(data) {
                            toastr.success("已保存！");
                            modal.modal('hide');
                        });
                    }
                }
            },
            {
                name: "page5",
                cnName: d.page5.cnName,
                bindEvnts: function(selector, off) {
                    modalFunc.contentListByBtn(selector, {
                        key: "contents",
                        listSCallback: function(modal, items, data) {
                            __content.page1 = langx.clone(data);
                        },
                        list_selectable: "multi"
                    }, off);
                },
                save: function(selector) {
                    var parseData = modalFunc.parseForm(selector.find(".sub-form"));
                    parseData._content = __content.page1;
                    __content.page1 = null;

                    if (modalFunc.checkForm(["name"], modal)) {
                        modalFunc.save("contents", selector.find(".form"), {
                            sub: JSON.stringify(parseData)
                        }, function(data) {
                            toastr.success("已保存！");
                            modal.modal('hide');
                        });
                    }
                }
            },
            {
                name: "page6",
                cnName: d.page6.cnName,
                bindEvnts: function(selector, off) {
                    modalFunc.contentListByBtn(selector, {
                        key: "contents",
                        listSCallback: function(modal, items, data) {
                            __content.page1 = langx.clone(data);
                        },
                        list_selectable: "multi"
                    }, off);
                },
                save: function(selector) {
                    var parseData = modalFunc.parseForm(selector.find(".sub-form"));
                    parseData._content = __content.page1;
                    __content.page1 = null;

                    if (modalFunc.checkForm(["name"], modal)) {
                        modalFunc.save("contents", selector.find(".form"), {
                            sub: JSON.stringify(parseData)
                        }, function(data) {
                            toastr.success("已保存！");
                            modal.modal('hide');
                        });
                    }
                }
            },
            {
                name: "page7",
                cnName: d.page7.cnName,
                bindEvnts: function(selector, off) {
                    modalFunc.contentListByBtn(selector, {
                        key: "contents",
                        listSCallback: function(modal, items, data) {
                            __content.page1 = langx.clone(data);
                        },
                        list_selectable: "multi"
                    }, off);
                },
                save: function(selector) {
                    var parseData = modalFunc.parseForm(selector.find(".sub-form"));
                    parseData._content = __content.page1;
                    __content.page1 = null;

                    if (modalFunc.checkForm(["name"], modal)) {
                        modalFunc.save("contents", selector.find(".form"), {
                            sub: JSON.stringify(parseData)
                        }, function(data) {
                            toastr.success("已保存！");
                            modal.modal('hide');
                        });
                    }
                }
            }
        ],
        getTplByKey: tplHelper.getTplByKey,
        getForm: tplHelper.getForm,
        getContent: tplHelper.getContent

    };
});