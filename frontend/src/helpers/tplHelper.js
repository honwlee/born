define([
    "skylarkjs",
    "./Partial",
    "./List",
    "jquery",
    "lodash",
    "handlebars",
    "text!./_tplPartials.hbs"
], function(skylarkjs, partial, List, $, _, hbs, template) {
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
                    _s.delegate(".activity-item", "click", function(e) {
                        var id = $(e.currentTarget).data("id");
                        window.go("/activity/" + id, true);
                    });
                    return _s;
                }
            },
            homePage4: {
                name: "homePage4",
                cnName: "美国待产环境",
                show: function(tpl, data) {
                    var _s = $(tpl(data));
                    _s.delegate(".env-item", "click", function(e) {
                        var id = $(e.currentTarget).data("id");
                        window.go("/posts/" + id, true);
                    });
                    return _s;
                }
            },
            homePage5: {
                name: "homePage5",
                cnName: "我们的优势",
                show: function(tpl, data) {
                    var first = _.first(data.snippets),
                        length = data.snippets.length,
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
                cnName: "新闻资讯",
                show: function(tpl, data) {
                    var _s = $(tpl(data));
                    _s.delegate(".news-item", "click", function(e) {
                        var id = $(e.currentTarget).data("id");
                        window.go("/news/" + id, true);
                    });
                    return _s;
                }
            },
            processPage1: {
                domId: "pProcess",
                name: "processPage1",
                cnName: "主要流程",
                show: function(tpl, data) {
                    var leftData = [],
                        rightData = [];
                    _(data.snippets).each(function(d, index) {
                        if (index % 2) {
                            rightData.push(d);
                        } else {
                            leftData.push(d);
                        }
                    });
                    var _s = $(tpl({
                        title: data.title,
                        leftData: leftData,
                        rightData: rightData
                    }));
                    return _s;
                }
            },
            visaPage: {
                domId: "pVisa",
                name: "visaPage",
                cnName: "签证申请",
            },
            hospitalPage: {
                domId: "pCohospital",
                name: "hospitalPage",
                cnName: "合作医院",
            },
            processEnvPage: {
                domId: "pEnvironment",
                name: "processEnvPage",
                cnName: "待产环境",
                show: function(tpl, data) {
                    var list = new List({
                        title: "待产环境列表",
                        id: "_prEnvPage",
                        key: "posts",
                        defaultView: "thumbnail",
                        needHeader: false,
                        thumbnail_template: '<div class="thumbnail repeater-thumbnail col-md-6 col-sm-6 com-xs-12" style="background: {{color}};"><img class=""  alt="{{name}}" src="{{src}}" ><span>{{name}}</span></div>',
                        actionName: "public_env"
                    });
                    var _s = $(tpl());
                    list.getDom().appendTo(_s);
                    return _s;
                }
            },
            certificatePage: {
                domId: "pCertificate",
                name: "certificatePage",
                cnName: "证件办理",
            },
            aboutPage: {
                domId: "aAbout",
                name: "aboutPage",
                cnName: "关于我们",
            },
            contactPage: {
                domId: "aContact",
                name: "contactPage",
                cnName: "联系我们",
            },
            retServicePage: {
                name: "retServicePage",
                cnName: "回国服务",
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