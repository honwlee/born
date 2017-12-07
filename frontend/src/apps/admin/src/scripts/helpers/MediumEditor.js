define([
    "jquery",
    "skylarkjs",
    "lodash",
    "./Partial",
    "MediumEditor",
    "server",
    "handlebars"
], function($, skylarkjs, _, partial, MediumEditor, server, hbs) {
    var langx = skylarkjs.langx;
    return langx.Evented.inherit({
        klass: "MediumEditor",
        init: function(opts) {
            this.editor = this.initEditor(opts.selector);
        },
        getEdit: function() {
            return this.editor;
        },
        initEditor: function(selector) {
            var editor = new MediumEditor(selector.find('.editable')[0], {
                toolbar: {
                    /* These are the default options for the toolbar,
                       if nothing is passed this is what is used */
                    allowMultiParagraphSelection: true,
                    buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
                    diffLeft: 0,
                    diffTop: -10,
                    firstButtonClass: 'medium-editor-button-first',
                    lastButtonClass: 'medium-editor-button-last',
                    relativeContainer: null,
                    standardizeSelectionStart: false,
                    static: false,
                    /* options which only apply when static is true */
                    align: 'center',
                    sticky: false,
                    updateOnEmptySelection: false
                }
            });
            return editor;
        }
    });
});