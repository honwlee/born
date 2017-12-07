define([
    "jquery",
    "skylarkjs",
    "lodash",
    "./Partial",
    "simplemde",
    "server",
    "handlebars"
], function($, skylarkjs, _, partial, SimpleMDE, server, hbs) {
    var langx = skylarkjs.langx;

    function _replaceSelection(cm, active, startEnd, url) {
        if (/editor-preview-active/.test(cm.getWrapperElement().lastChild.className))
            return;

        var text;
        var start = startEnd[0];
        var end = startEnd[1];
        var startPoint = cm.getCursor("start");
        var endPoint = cm.getCursor("end");
        if (url) {
            end = end.replace("#url#", url);
        }
        if (active) {
            text = cm.getLine(startPoint.line);
            start = text.slice(0, startPoint.ch);
            end = text.slice(startPoint.ch);
            cm.replaceRange(start + end, {
                line: startPoint.line,
                ch: 0
            });
        } else {
            text = cm.getSelection();
            cm.replaceSelection(start + text + end);

            startPoint.ch += start.length;
            if (startPoint !== endPoint) {
                endPoint.ch += start.length;
            }
        }
        cm.setSelection(startPoint, endPoint);
        cm.focus();
    };

    function buildPhotoList(_callback) {
        require(["scripts/helpers/List"], function(List) {
            var list = new List({
                title: "图片列表",
                id: "photoModalRepeater",
                thumbnail_template: '<div class="thumbnail repeater-thumbnail" style="background: {{color}};"><img height="75" src="{{src}}" width="65"><span>{{name}}</span></div>',
                addBtn: false,
                listShow: false,
                dataSource: function(options, callback) {
                    // set options
                    var pageIndex = options.pageIndex;
                    var pageSize = options.pageSize;
                    var options = {
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        sortDirection: options.sortDirection,
                        sortBy: options.sortProperty,
                        filterBy: options.filter.value || '',
                        searchBy: options.search || ''
                    };

                    server().connect("photos", "get", "index").then(function(data) {
                        var items = data.rows;
                        var totalItems = data.total;
                        var totalPages = Math.ceil(totalItems / pageSize);
                        var startIndex = (pageIndex * pageSize) + 1;
                        var endIndex = (startIndex + pageSize) - 1;

                        if (endIndex > items.length) {
                            endIndex = items.length;
                        }

                        // configure datasource
                        var dataSource = {
                            page: pageIndex,
                            pages: totalPages,
                            count: totalItems,
                            start: startIndex,
                            end: endIndex,
                            columns: [],
                            items: items
                        };

                        // invoke callback to render repeater
                        callback(dataSource);
                        _callback(list);
                    });
                }
            });
        });
    };

    function showPhotos(callback) {
        buildPhotoList(function(list) {
            var modal = $("#contentModal");
            modal.find(".modal-body").html(list.getDom());
            modal.find(".modal-title").html("图片列表");
            modal.modal('show');
            callback();
        });
    };

    function drawImage(editor) {
        showPhotos(function() {
            var cm = editor.codemirror;
            var stat = editor.getState(cm);
            var options = editor.options;
            var url = "http://";
            if (options.promptURLs) {
                url = prompt(options.promptTexts.image);
                if (!url) {
                    return false;
                }
            }
            _replaceSelection(cm, stat.image, options.insertTexts.image, url);
        });
    };

    return langx.Evented.inherit({
        klass: "SimpleMdeEditor",
        init: function(opts) {
            this.edit = this.initEditor(opts.selector);
        },
        getEdit: function() {
            return this.edit;
        },
        initEditor: function(selector) {
            var self = this,
                simplemde = new SimpleMDE({
                    element: selector,
                    autofocus: true,
                    onDrawImage: function() {
                        simplemde.drawImage("imageUrl")
                    },
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
                    initialValue: $(selector).text(),
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
                    promptURLs: false,
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
                        "bold", "italic", "heading", "code", {
                            name: "image",
                            action: function() {
                                drawImage(simplemde);
                            },
                            className: "fa fa-picture-o",
                            title: "Insert Image",
                            default: true
                        }, "link", "strikethrough",
                        "unordered-list", "ordered-list", "quote", "preview",
                        "table", "horizontal-rule", "side-by-side", "clean-block", "fullscreen", "guide"
                    ],
                    toolbarTips: true,
                });
            return simplemde;
        }
    });
});