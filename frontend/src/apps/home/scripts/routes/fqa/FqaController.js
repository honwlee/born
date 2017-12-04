define([
    "jquery",
    "skylarkjs",
    "handlebars",
    "scripts/helpers/Partial"
], function($, skylarkjs, hbs, Partial) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    var data = [{
        imgUrl: "./assets/images/fqa/0.png",
        title: "去美国生宝宝 产后忌口",
        desc: "月子里忌口，在民间甚为流行。有的地方至今流传着月子里除了吃小米粥和鸡蛋以外，其他什么都忌。这种忌口的习俗是不科学的。这是因为坐月子期间需要大量的营养，一是用来补充",
        date: "2017-11-24 09:23:39",
        viewCount: "93"
    }];

    [1, 2, 3, 4, 5].forEach(function(i) {
        data.push({
            imgUrl: "./assets/images/fqa/" + i + ".png",
            title: "去美国生宝宝 产后忌口",
            desc: "月子里忌口，在民间甚为流行。有的地方至今流传着月子里除了吃小米粥和鸡蛋以外，其他什么都忌。这种忌口的习俗是不科学的。这是因为坐月子期间需要大量的营养，一是用来补充",
            date: "2017-11-24 09:23:39",
            viewCount: "93"
        });
    });

    var recommended = [{
        title: "去美国生宝宝 产后忌口"
    }];
    return spa.RouteController.inherit({
        klassName: "FqaController",
        rendering: function(e) {
            Partial.get("info-list-partial");
            var tpl = hbs.compile("{{> info-list-partial}}"),
                self = this,
                _ec = $(tpl({
                    data: data,
                    latest: recommended,
                    recommended: recommended
                }));
            e.content = _ec[0];
        },

        entered: function() {},
        exited: function() {}
    });
});