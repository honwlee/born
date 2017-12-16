define([
    "skylarkjs",
    "./Partial",
    "jquery",
    "lodash",
    "handlebars",
    "text!./_tplPartials.hbs"
], function(skylarkjs, partial, $, _, hbs, template) {
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
                cnName: "生美国际赴美生子"
            },
            homePage2: {
                name: "homePage2",
                cnName: "我们的服务"
            },
            homePage3: {
                name: "homePage3",
                cnName: "在美活动",
                show: function(tpl, data) {
                    var first = _.first(data.posts),
                        length = data.length,
                        active = _.slice(data.posts, 1, data.posts.length),
                        _s = $(tpl({
                            title: data.title,
                            first: first,
                            activePage: active,
                        }));
                    return _s;
                }
            },
            homePage4: {
                name: "homePage4",
                cnName: "美国待产环境"
            },
            homePage5: {
                name: "homePage5",
                cnName: "我们的优势",
                show: function(tpl, data) {
                    var first = _.first(data.snippets),
                        length = data.length,
                        divide = _.chunk(data.snippets, 3),
                        _s = $(tpl({
                            title: data.title,
                            content: data.content,
                            first: first,
                            leftData: divide[0].reverse(),
                            rightData: divide[1]
                        })),
                        detail = _s.find(".detail");
                    _s.delegate(".item", "click", function(e) {
                        var li = $(this);
                        var d = li.data();
                        var index = d.right ? d.index + 4 : 3 - d.index;
                        detail.find(".title").empty().text(li.find(".item-title").text());
                        detail.find(".content").empty().text(li.find(".item-content").text());
                        detail.find(".page").empty().text(index + "/" + length);
                    });
                    return _s;
                }
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
        getContent: getContentTpl,
        show: function(name, data) {
            var tpl = this.getContent(name)
            if (this.data[name].show) {
                return this.data[name].show(tpl, data);
            } else {
                return $(tpl(data));
            }
        }
    };
});