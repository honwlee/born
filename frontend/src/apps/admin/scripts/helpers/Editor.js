define([
    "jquery",
    "skylarkjs",
    "lodash",
    "./Partial",
    "./modal",
    "server",
    "handlebars"
], function($, skylarkjs, _, partial, modal, server, hbs) {
    var langx = skylarkjs.langx;
    return langx.Evented.inherit({
        klass: "Editor",
        init: function() {

        },
        initEditor: function(selector, relateTarget, data) {
            var self = this,
                simplemde = new SimpleMDE({
                    element: selector.find("#simplemde")[0],
                    autofocus: true,
                    autosave: {
                        enabled: false,
                        uniqueId: "simplemde",
                        delay: 1000,
                    },
                    blockStyles: {
                        bold: "__",
                        italic: "_"
                    },
                    forceSync: true,
                    indentWithTabs: true,
                    initialValue: selector.find("#simplemde").text(),
                    insertTexts: {
                        horizontalRule: ["", "\n\n-----\n\n"],
                        image: ["![](http://", ")"],
                        link: ["[", "](http://)"],
                        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
                    },
                    lineWrapping: true,
                    parsingConfig: {
                        allowAtxHeaderWithoutSpace: true,
                        strikethrough: false,
                        underscoresBreakWords: true,
                    },
                    placeholder: "Type here...",
                    promptURLs: true,
                    renderingConfig: {
                        singleLineBreaks: false,
                        codeSyntaxHighlighting: true,
                    },
                    previewRender: function(plainText) {
                        // Note: "this" refers to the options object
                        return this.parent.markdown(plainText);
                    },
                    shortcuts: {
                        "toggleOrderedList": "Ctrl-Alt-K", // alter the shortcut for toggleOrderedList
                        "toggleCodeBlock": null, // unbind Ctrl-Alt-C
                        drawTable: "Cmd-Alt-T"
                    },
                    showIcons: ["code", "table"],
                    spellChecker: false,
                    status: ["autosave", "lines", "words", "cursor", {
                        className: "keystrokes",
                        defaultValue: function(el) {
                            this.keystrokes = 0;
                            el.innerHTML = "0 Keystrokes";
                        },
                        onUpdate: function(el) {
                            el.innerHTML = ++this.keystrokes + " Keystrokes";
                        }
                    }], // Another optional usage, with a custom status bar item that counts keystrokes
                    styleSelectedText: true,
                    tabSize: 4,
                    toolbar: [
                        "bold", "italic", "heading", "code", "image", "link", "strikethrough",
                        "unordered-list", "ordered-list", "quote", "preview",
                        "table", "horizontal-rule", "side-by-side", "clean-block", "fullscreen", "guide"
                    ],
                    toolbarTips: true,
                });
            return simplemde;
        }
    });
});