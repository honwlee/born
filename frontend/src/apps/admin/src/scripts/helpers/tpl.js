define([
    "skylarkjs",
    "./Partial",
    "jquery",
    "server",
    "toastr",
    "handlebars",
    "text!./_tplPartials.hbs"
], function(skylarkjs, partial, SimpeMdeEditor, $, server, toastr, handlebars, template) {
    var langx = skylarkjs.langx;
    var __selector = $(langx.trim(template));

    function getTpl(name) {
        var formName = name + "-form-partial",
            contentName = name + "-partial";
        partial.get(formName, __selector);
        partial.get(contentName, __selector);
        var tpl = hbs.compile("{{> " + contentName + "}}");
        var formTpl = hbs.compile("{{> " + formName + "}}");
        return [tpl, formTpl];
    }

    return {
        tpls: ["page1", "page2"],
        get: getTpl
    };
});