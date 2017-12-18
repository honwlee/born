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
        d = tplHelper.data,
        bindEvntsFunc = function(name, selector, off, opts) {
            opts = opts || {
                list_selectable: "multi"
            };
            modalFunc.contentListByBtn(selector, {
                key: "contents",
                listSCallback: function(modal, items, data) {
                    __content[name] = langx.clone(data);
                },
                list_selectable: opts.list_selectable
            }, off);
        },

        saveFunc = function(name, selector) {
            var parseData = modalFunc.parseForm(selector.find(".sub-form"));
            parseData._content = __content[name];
            __content[name] = null;

            if (modalFunc.checkForm(["name"], selector)) {
                modalFunc.save("contents", selector.find(".form"), {
                    sub: JSON.stringify(parseData)
                }, function(data) {
                    toastr.success("已保存！");
                    selector.modal('hide');
                });
            }
        };
    var retObj = {
        getTplByKey: tplHelper.getTplByKey,
        getForm: tplHelper.getForm,
        getContent: tplHelper.getContent,
        tpls: []
    };
    for (var key in d) {
        (function(_d, k) {
            retObj.tpls.push({
                name: k,
                cnName: _d.cnName,
                bindEvnts: function(selector, off) {
                    bindEvntsFunc(k, selector, off);
                },
                save: function(selector) {
                    saveFunc(k, selector);
                }
            });
        })(d[key], key)
    }
    return retObj;
});