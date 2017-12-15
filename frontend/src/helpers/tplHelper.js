define([
    "skylarkjs",
    "./Partial",
    "jquery",
    "handlebars",
    "text!./_tplPartials.hbs"
], function(skylarkjs, partial, $, hbs, template) {
    var langx = skylarkjs.langx,
        __selector = $(langx.trim(template));

    function getFormTpl(name) {
        var formName = name + "-form-partial";
        partial.get(formName, __selector);
        var formTpl = hbs.compile("{{> " + formName + "}}");
        return formTpl;
    };

    function getContentTpl(name) {
        var contentName = name + "-partial";
        partial.get(contentName, __selector);
        var tpl = hbs.compile("{{> " + contentName + "}}");
        return tpl;
    }
    return {
        data: {
            homePage1: {
                name: "homePage1",
                cnName: "生美国际赴美生子",
            },
            homePage2: {
                name: "homePage2",
                cnName: "我们的服务"
            },
            homePage3: {
                name: "homePage3",
                cnName: "在美活动"
            },

            homePage4: {
                name: "homePage4",
                cnName: "美国待产环境"
            },
            homePage5: {
                name: "homePage5",
                cnName: "我们的优势"
            },

            homePage6: {
                name: "homePage6",
                cnName: "贴心服务"
            },
            homePage7: {
                name: "homePage7",
                cnName: "新闻资讯"
            }
        },
        getTplByKey: function(key) {
            return this.tpls.filter(function(t) { return t.name === key; })[0];
        },
        getForm: getFormTpl,
        getContent: getContentTpl
    };
});