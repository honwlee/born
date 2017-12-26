define([
    "jquery",
    "skylarkjs",
    "text!./_partials.hbs",
    "handlebars"
], function($, skylarkjs, partialsTpl, handlebars) {
    var langx = skylarkjs.langx;
    var partials = {};
    var __selector = $(langx.trim(partialsTpl));
    var _registryPartial = function(name, selector) {
        selector = selector || __selector;
        selector.find("#" + name).each(function(index, partial) {
            handlebars.registerPartial(name, langx.trim($(partial).html()).replace(/\{\{&gt;/g, "{{>"));
            partials[name] = true;
        });
    }
    handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {

        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    var obj = {
        get: function(name, selector) {
            if (!partials[name]) _registryPartial(name, selector);
        },
        slide: function(banners) {
            obj.get("slide-component-partial");
            var tpl = handlebars.compile("{{> slide-component-partial}}");
            return $(tpl({
                banners: banners
            }));
        }
    };
    obj.get("repeater-tpl-partial");
    obj.get("datepicker-tpl-partial");
    obj.get("checkbox-tpl-partial");
    obj.get("wizard-tpl-partial");
    return obj;
});