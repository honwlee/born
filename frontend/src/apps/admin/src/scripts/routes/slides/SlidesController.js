define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "lodash",
    "server",
    "scripts/helpers/modal",
    "scripts/helpers/Partial",
    "scripts/helpers/List",
    "text!scripts/helpers/_formPartial.hbs"
], function($, skylarkjs, hbs, _, server, modalFunc, partial, List, formTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        formSelector = $(langx.trim(formTpl));
    partial.get("page-select-partial", formSelector);
    partial.get("slide-form-partial", formSelector);
    var tpl = hbs.compile("{{> slide-form-partial}}");
    return spa.RouteController.inherit({
        klassName: "SlidesController",
        repeaterId: "slidesRepeater",
        list: null,
        preparing: function(e) {
            var self = this;
            e.result = server().connect("pages", "get", "select").then(function(pages) {
                self.pages = pages;
            });
        },

        buildList: function(post) {
            this.list = new List({
                title: "图片列表",
                id: this.repeaterId,
                key: "slides",
                actions: [{
                    name: "delete",
                    title: "删除slide",
                    tpl: "",
                    callback: function() {

                    }
                }],
                columns: [{
                    label: '名称',
                    property: 'name',
                    sortable: true
                }, {
                    label: '所属页面',
                    property: 'page',
                    sortable: false
                }]
            });
        },

        addPage: function() {

        },

        rendering: function(e) {
            this.buildList();
            var self = this,
                selector = this.list.getDom();
            selector.find(".repeater-add button").off("click").on("click", function(e) {
                var modal = modalFunc.show("form", $(tpl({
                    pages: self.pages
                })), "添加slide", {
                    list_selectable: "multi",
                    key: "slides",
                    file: true,
                    callback: function() {
                        selector.repeater('render');
                    },
                    listSCallback: function(modal, items) {
                        var div = $("<div>").attr({ class: "row" }).appendTo(modal.find(".result-container").empty());
                        items.forEach(function(item) {
                            $("<div>").attr({
                                class: "col-xs-6 col-md-3"
                            }).appendTo(div).html("<img style='width:auto;height:80px;' src='" + item.data.src + "' >");
                        });
                    }
                });

            });

            e.content = this.list.getDom()[0];
        },

        entered: function() {},
        exited: function() {}
    });
});