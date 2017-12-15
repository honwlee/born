define([
    "skylarkjs",
    "./Partial",
    "jquery",
    "handlebars",
    "text!./_tplPartials.hbs"
], function(skylarkjs, partial, $, hbs, template) {
    var langx = skylarkjs.langx,
        __selector = $(langx.trim(template));

    function getFormTpl(name) {
        var formName = name + "-form-partial";
        partial.get(formName, __selector);
        var formTpl = hbs.compile("{{> " + formName + "}}");
        return formTpl;
    };

    function getContentTpl(name) {
        var contentName = name + "-partial";
        partial.get(contentName, __selector);
        var tpl = hbs.compile("{{> " + contentName + "}}");
        return tpl;
    }
    return {
        data: {
            page1: {
                name: "page1",
                cnName: "模板一",
            },
            page2: {
                name: "page2",
                cnName: "模板二"
            },
            page3: {
                name: "page3",
                cnName: "模板三"
            },
            page4: {
                name: "page4",
                cnName: "模板四"
            },
            page5: {
                name: "page5",
                cnName: "模板五"
            },
            page6: {
                name: "page6",
                cnName: "模板六"
            },
            page7: {
                name: "page7",
                cnName: "模板七"
            }
        },
        getTplByKey: function(key) {
            return this.tpls.filter(function(t) { return t.name === key; })[0];
        },
        getForm: getFormTpl,
        getContent: getContentTpl
    };
});