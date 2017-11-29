define([
    "skylarkjs",
    "./Partial",
    "./color",
    "jquery",
    "handlebars"
], function(skylarkjs, partial, colorCtrl, $, handlebars) {
    var langx = skylarkjs.langx;
    return langx.Evented.inherit({
        klassName: "ProfileColorSetting",
        currentColor: null,
        init: function(args) {
            args = args || {};
            this.colorOptions = args.colorOptions || {};
            this.colorType = args.colorType || "normal";
            this.dom = this._buildDom();
        },

        _buildDom: function() {
            var color = this._color = new colorCtrl[this.colorType],
                div = $("<div>").attr({
                    class: "colors"
                }).html(color.start(this.colorOptions));
            return div;
        },
        getColor: function() {
            return this._color.getColor();
        },
        start: function() {
            return this.dom;
        }
    });
});
