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
            homeDesc: {
                name: "homeDesc",
                cnName: "生美国际赴美生子",
                category: "home"
            },
            homeService: {
                name: "homeService",
                cnName: "我们的服务",
                category: "home"
            },
            homeActivity: {
                name: "homeActivity",
                cnName: "在美活动",
                category: "home",
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
            homeEnv: {
                name: "homeEnv",
                cnName: "美国待产环境",
                category: "home",
                show: function(tpl, data) {
                    var _s = $(tpl(data));
                    _s.delegate(".env-item", "click", function(e) {
                        var id = $(e.currentTarget).data("id");
                        window.go("/posts/" + id, true);
                    });
                    return _s;
                }
            },
            homeVantage: {
                name: "homeVantage",
                cnName: "我们的优势",
                category: "home",
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
            homeProvide: {
                name: "homeProvide",
                cnName: "贴心服务",
                category: "home",
                show: function(tpl, sub, main) {
                    var src = (main.src || "").replace(/\\/g, "/");
                    sub.src = src;
                    var _s = $(tpl(sub));
                    return _s;
                }
            },
            homeNews: {
                name: "homeNews",
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
            processMain: {
                domId: "pProcess",
                name: "processMain",
                cnName: "主要流程",
                category: "process",
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
            processVisa: {
                domId: "pVisa",
                name: "processVisa",
                cnName: "签证申请",
                category: "process",
            },
            processHospital: {
                domId: "pCohospital",
                name: "processHospital",
                cnName: "合作医院",
                category: "process",
            },
            processEnv: {
                domId: "pEnvironment",
                name: "processEnv",
                cnName: "待产环境",
                category: "process",
                show: function(tpl, data) {
                    var list = new List({
                        title: "待产环境列表",
                        id: "_prEnvPage",
                        key: "posts",
                        defaultView: "thumbnail",
                        needHeader: false,
                        // thumbnail_template: '<div class="thumbnail repeater-thumbnail col-md-6 col-sm-6 com-xs-12" style="background: {{color}};"><img class=""  alt="{{name}}" src="{{src}}" ><span>{{name}}</span></div>',
                        thumbnail_template: '<div class = "col-md-4 col-sm-6 col-xs-12" ><div class = "thumbnail" ><img src = "{{src}}"alt = "{{title}}" ><div class = "caption" > <h5>{{title}} </h5></div> </div> </div>',

                        actionName: "public_env"
                    });
                    var _s = $(tpl());
                    list.getDom().appendTo(_s);
                    return _s;
                }
            },
            processCertificate: {
                domId: "pCertificate",
                name: "processCertificate",
                cnName: "证件办理",
                category: "process",
            },
            aboutPage: {
                domId: "aAbout",
                name: "aboutPage",
                cnName: "关于我们",
                category: "about",
            },
            aboutContact: {
                domId: "aContact",
                name: "aboutContact",
                cnName: "联系我们",
                category: "about",
            },
            retServicePage: {
                name: "retServicePage",
                cnName: "回国服务",
                category: "service",
            }
        },
        getTplByKey: function(key) {
            return this.tpls.filter(function(t) { return t.name === key; })[0];
        },
        getForm: getFormTpl,
        getContent: getContentTpl,
        show: function(name, sub, main) {
            var tpl = this.getContent(name)
            if (this.data[name].show) {
                return this.data[name].show(tpl, sub, main);
            } else {
                return $(tpl(sub));
            }
        }
    };
});