define([
    "jquery",
    "skylarkjs",
    "../Partial",
    "jquery",
    "server",
    "toastr",
    "text!./_partials.hbs",
    "handlebars"
], function($, skylarkjs, partial, $, server, toastr, partialsTpl, hbs) {
    var langx = skylarkjs.langx,
        __files = {},
        __content = {},
        __selector = $(langx.trim(partialsTpl));

    return {
        slide: function(banners) {
            partial.get("slide-component-partial", __selector);
            var tpl = hbs.compile("{{> slide-component-partial}}");
            return $(tpl({
                banners: banners
            }));
        }
    };

});