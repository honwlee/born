define([
    "jquery",
    "skylarkjs",
    "lodash",
    "./Partial",
    "text!./_fueluxPartials.hbs",
    "server",
    "handlebars"
], function($, skylarkjs, _, partial, fueluxTpl, hbs) {
    var langx = skylarkjs.langx;
    var __selector = $(langx.trim(fueluxTpl));
    partial.get("repeater-tpl-partial", __selector);
    partial.get("datepicker-tpl-partial", __selector);
    partial.get("checkbox-tpl-partial", __selector);
    partial.get("wizard-tpl-partial", __selector);
});