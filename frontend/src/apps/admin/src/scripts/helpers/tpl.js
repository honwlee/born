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
                name: "homePage1",
                cnName: d.homePage1.cnName,
                bindEvnts: function(selector, off) {
                    modalFunc.contentListByBtn(selector, {
                        key: "contents",
                        listSCallback: function(modal, items, data) {
                            __content.homePage1 = langx.clone(data);
                        },
                        list_selectable: "multi"
                    }, off);
                },
                save: function(selector) {
                    var parseData = modalFunc.parseForm(selector.find(".sub-form"));
                    parseData._content = __content.homePage1;
                    __content.homePage1 = null;

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
                name: "homePage2",
                cnName: d.homePage2.cnName,
                bindEvnts: function(selector, off) {
                    modalFunc.contentListByBtn(selector, {
                        key: "contents",
                        listSCallback: function(modal, items, data) {
                            __content.homePage2 = langx.clone(data);
                        },
                        list_selectable: "multi"
                    }, off);
                },
                save: function(selector) {
                    var parseData = modalFunc.parseForm(selector.find(".sub-form"));
                    parseData._content = __content.homePage2;
                    __content.homePage2 = null;

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
                name: "homePage3",
                cnName: d.homePage3.cnName,
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
                name: "homePage4",
                cnName: d.homePage4.cnName,
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
                name: "homePage5",
                cnName: d.homePage5.cnName,
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
                name: "homePage6",
                cnName: d.homePage6.cnName,
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
                name: "homePage7",
                cnName: d.homePage7.cnName,
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
                name: "processPage1",
                cnName: d.processPage1.cnName,
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
                name: "visaPage",
                cnName: d.visaPage.cnName,
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
                name: "certificatePage",
                cnName: d.certificatePage.cnName,
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
                name: "hospitalPage",
                cnName: d.hospitalPage.cnName,
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
                name: "processEnvPage",
                cnName: d.processEnvPage.cnName,
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
                name: "aboutPage",
                cnName: d.aboutPage.cnName,
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
                name: "contactPage",
                cnName: d.contactPage.cnName,
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

        ],
        getTplByKey: tplHelper.getTplByKey,
        getForm: tplHelper.getForm,
        getContent: tplHelper.getContent

    };
});