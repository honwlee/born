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
        }],
        getForm: getFormTpl,
        getContent: getContentTpl
    };
});