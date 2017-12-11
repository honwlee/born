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
], function($, skylarkjs, hbs, _, server, modal, partial, List, formTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        formSelector = $(langx.trim(formTpl));
    partial.get("photo-form-partial", formSelector);
    var tpl = hbs.compile("{{> photo-form-partial}}");
    return spa.RouteController.inherit({
        klassName: "PhotoController",
        repeaterId: "photoRepeater",
        list: null,
        preparing: function(e) {
            var self = this;
        },

        buildList: function(post) {
            this.list = new List({
                thumbnail_template: '<div class="thumbnail repeater-thumbnail" style="background: {{color}};"><img height="75" src="{{src}}" width="65"><span>{{name}}</span></div>',
                thumbnail_selectable: true,
                title: "图片列表",
                id: "photoRepeater",
                key: "photos",
                actions: [{
                    name: "delete",
                    title: "删除页面",
                    tpl: "",
                    callback: function() {

                    }
                }],
                columns: [{
                    label: '名称',
                    property: 'name',
                    sortable: true
                }, {
                    label: '图片地址',
                    property: 'src',
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
                modal.show("form", $(tpl()), "添加文章", {
                    key: "photos",
                    file: true,
                    callback: function() {
                        selector.repeater('render');
                    }
                });
            });
            selector.find(".repeater-refresh button").off("click").on("click", function(e) {
                selector.repeater('render');
            });
            e.content = this.list.getDom()[0];
        },

        entered: function() {},
        exited: function() {}
    });
});