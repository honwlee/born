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
        __file,
        d = tplHelper.data,
        bindEvntsFunc = function(parent, name, selector, off) {
            // opts = opts || {
            //     list_selectable: "multi"
            // };

            modalFunc.contentListByBtn(selector, {
                key: "contents",
                listSCallback: function(modal, items, data) {
                    __content[name] = langx.clone(data);
                },
                list_selectable: "multi"
            }, off);
        },

        saveFunc = function(name, selector, opts, actionName) {
            var deferred = new langx.Deferred();
            var parseData = modalFunc.parseForm(selector.find(".sub-form"));
            parseData._content = __content[name];
            __content[name] = null;
            var saveParam = langx.mixin({
                sub: JSON.stringify(parseData)
            }, opts || {});
            if (modalFunc.checkForm(["name"], selector)) {
                modalFunc.save("contents", selector.find(".form"), saveParam, function(data) {
                    toastr.success("已保存！");
                    selector.modal('hide');
                    deferred.resolve(true);
                }, actionName);
            } else {
                deferred.resolve(false);
            }
            return deferred.promise;
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
                category: _d.category,
                cnName: _d.cnName,
                bindEvnts: function(parent, selector, off) {
                    bindEvntsFunc(parent, k, selector, off);
                },
                save: function(selector, opts, actionName) {
                    return saveFunc(k, selector, opts, actionName);
                }
            });
        })(d[key], key)
    }
    return retObj;
});