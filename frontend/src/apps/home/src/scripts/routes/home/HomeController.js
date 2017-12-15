define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "server",
    "scripts/helpers/tplHelper",
    "scripts/helpers/components/components",
    "text!scripts/routes/home/_pages.hbs",
    "text!scripts/routes/home/home.hbs"
], function($, skylarkjs, hbs, server, tplHelper, components, pagesTpl, homeTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        pageSelector = $(langx.trim(pagesTpl)),
        selector = $(langx.trim(homeTpl));

    var attendUsaPage = [];
    [1, 2, 3].forEach(function(i) {
        attendUsaPage.push({
            src: "/assets/images/wap_new/235104-1305100HP046.png",
            href: "/",
            title: "赴美生子的优势",
            // 赴美生子的安全合法性  赴美的流程
            text: "2017年1~9月，中美贸易总额2.89万亿人民币，增长了18.7%，其中中国对美出口增长了16.5%，从美国进口则增长了25%。]",
            imgUrl: "/assets/images/news/4.png"
        });
    });

    var servicePage = [];
    [1, 2, 3, 4, 5].forEach(function(i) {
        servicePage.push({
            href: "/",
            title: "赴美咨询",
            serviceClass: "row_bg" + i,
            // 赴美签证 美宝美妈 美国生活 出生之后
            text: "赴美生子常见问答：签证、机票、保险、过海关，产检分娩、宝宝证件办理、回国如何上户口等等。",
            imgUrl: "/assets/images/news/4.png"
        });
    });
    var advantagesLeftPage = [];
    [3, 2, 1].forEach(function(i) {
        advantagesLeftPage.push({
            href: "/",
            title: "赴美生子诚实签",
            class: "pt_left_" + 0 + i,
            dataMain: i,
            //一站式定制服务  直营品牌保障 套餐价格多样 免费预约服务 严保客户隐私
            text: "Rancho Cucamonga别墅",
            imgUrl: "/assets/images/wap_new/img/part3_04.png"
        });
    });

    var advantagesRightPage = [];
    [6, 5, 4].forEach(function(i) {
        advantagesRightPage.push({
            href: "/",
            title: "免费预约服务",
            class: "pt_left_" + 0 + i,
            dataMain: i,
            //一站式定制服务  直营品牌保障 套餐价格多样 免费预约服务 严保客户隐私
            text: "Rancho Cucamonga别墅",
            imgUrl: "/assets/images/wap_new/img/part3_06.png"
        });
    });

    var environmentPage = [];
    [1, 2, 3].forEach(function(i) {
        environmentPage.push({
            href: "/",
            title: "赴美咨询",
            text: "Rancho Cucamonga别墅",
            imgUrl: "/assets/images/wap_new/y1.png"
        });
    });
    var activePage = [];
    [1, 2, 3, 4].forEach(function(i) {
        activePage.push({
            title: "新疆赴美生子生美国际月子中心庆祝美宝满月",
            text: "新疆赴美生子生美国际月子中心庆祝美宝满月",
            con: "洛杉矶生美国际月子中心Rancho Cucamonga别墅里来自新疆乌鲁木齐的赴美产子客人为自家的小美宝庆祝满月啦 ， 妈妈这次是来美国生二宝的， 大宝是位小王子，二宝也是哦，哥俩以后可以一起",
            imgUrl: "/assets/images/10361431_IMG_6166.jpeg",
            href: "/"
        });
    });

    var newsPage = [];
    [1, 2].forEach(function(i) {
        newsPage.push({
            title: "特朗普打破多年惯...",
            text: "2017年1~9月，中美贸易总额2.89万亿人民币，增长了18.7%，其中中国对美出口增长了16.5%，从美国进口则增长了25%。]",
            imgUrl: "/assets/images/news/4.png"
        });
    });
    var intimateServicePage = [];
    [1, 2, 3, 4, 5].forEach(function(i) {
        intimateServicePage.push({
            imgUrl: "/assets/images/part10_04.png",
            title: "省心", //放心  安心 贴心 热心
            text: "一站式定制服务",
            con: "售前咨询，轻松美签，顺利过关。",

        });
    });

    function preparePage(data) {
        var pages = [];
        [1, 2, 3, 4, 5, 6, 7].forEach(function(j) {
            var name = "home-page" + j + "-partial";
            hbs.registerPartial(name, langx.trim(pageSelector.find("#" + name).html()).replace(/\{\{&gt;/g, "{{>"));
            var tpl = hbs.compile("{{> " + name + "}}");
            pages.push({
                html: tpl({
                    attendUsaPage: attendUsaPage,
                    servicePage: servicePage,
                    activePage: activePage,
                    newsPage: newsPage,
                    advantagesLeftPage: advantagesLeftPage,
                    advantagesRightPage: advantagesRightPage,
                    environmentPage: environmentPage,
                    intimateServicePage: intimateServicePage
                })
            });
        });
        return pages;
    };

    return spa.RouteController.inherit({
        klassName: "HomeController",
        pageData: null,
        preparing: function(e) {
            var self = this;
            e.result = server().connect("pages", "get", "show?key=name&&value=" + e.route.name).then(function(data) {
                self.pageData = data;
            });
        },

        rendering: function(e) {
            var tpl = hbs.compile(langx.trim(selector.find("#home-main").html()).replace("{{&gt;", "{{>")),
                self = this,
                _ec = $(tpl({
                    pages: preparePage()
                }));
            $(components.slide(this.pageData.slide)).prependTo(_ec.find(".home-slide-container"));
            // self.pageData.contents.forEach(function(content) {
            //     $(tplHelper.getContent(content.tpl)(content.sub)).appendTo(_ec.find(".pages"));
            // });
            e.content = _ec[0];
        },

        rendered: function() {
            $('.carousel').carousel()
        },

        entered: function() {},
        exited: function() {}
    });
});