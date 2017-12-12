define([
    "skylarkjs",
    "./Partial",
    "jquery",
    "server",
    "toastr",
    "handlebars",
    "text!./_tplPartials.hbs"
], function(skylarkjs, partial, $, server, toastr, hbs, template) {
    var langx = skylarkjs.langx;
    var __selector = $(langx.trim(template));

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
        tpls: [{
                name: "page1",
                cnName: "模板一"
            }, {
                name: "page2",
                cnName: "模板二"
            },
            {
                name: "page3",
                cnName: "模板三"
            },
            {
                name: "page4",
                cnName: "模板四"
            },
            {
                name: "page5",
                cnName: "模板五"
            },
            {
                name: "page6",
                cnName: "模板六"
            },
            {
                name: "page7",
                cnName: "模板七"
            }
        ],
        getForm: getFormTpl,
        getContent: getContentTpl
    };
});