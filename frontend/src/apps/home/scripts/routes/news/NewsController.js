define([
    "skylarkjs",
    "handlebars",
    "text!scripts/routes/news/news.hbs"
], function(skylarkjs, hbs, newsTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        $ = skylarkjs.query;
    selector = $(langx.trim(newsTpl));
    var Data = [{
        imgUrl: "./assets/images/news/0.png",
        title: "去美国生宝宝 产后忌口",
        desc: "月子里忌口，在民间甚为流行。有的地方至今流传着月子里除了吃小米粥和鸡蛋以外，其他什么都忌。这种忌口的习俗是不科学的。这是因为坐月子期间需要大量的营养，一是用来补充",
        date: "2017-11-24 09:23:39",
        viewCount: "93"
    }];

    [1, 2, 3, 4, 5].forEach(function(i) {
        Data.push({
            imgUrl: "./assets/images/news/" + i + ".png"
        });
    });

    var Recommended = [{
        heading: "美国相关资讯推荐 and 相关推荐",
        item: "去美国生宝宝 产后忌口"
    }];
    return spa.RouteController.inherit({
        klassName: "newsController",

        rendering: function(e) {
            var tpl = hbs.compile(langx.trim(selector.find("#news-wrap").html()).replace("{{&gt;", "{{>")),
                self = this,
                _ec = $(tpl({
                    data: Data,
                    recommended: Recommended
                }));
            e.content = _ec[0];
        },

        entered: function() {},
        exited: function() {}
    });
});