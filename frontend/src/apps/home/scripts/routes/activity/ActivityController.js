define([
    "jquery",
    "skylarkjs",
    "scripts/helpers/photoSwipe",
    "text!scripts/routes/activity/activity.hbs"
], function($, skylarkjs, photoSwipe, activityTpl) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return spa.RouteController.inherit({
        klassName: "ActivityController",

        preparing: function(e) {

        },
        rendering: function(e) {
            var photos = [];
            var path = "http://img.bj.wezhan.cn/content/sitefiles/2069715/images/";
            [
                "10361429_IMG_5268", "10359684_IMG_5278", "10359175_IMG_5284",
                "10361458_IMG_6063", "10361425_IMG_2129", "10361430_IMG_6278",
                "10361431_IMG_6166", "10361309_IMG_5475", "10361200_IMG_5758",
                "10361210_IMG_5896", "10361228_IMG_5930", "10361195_IMG_5351",
                "10361147_IMG_6069", "10361119_IMG_5820", "10360862_IMG_6175"
            ].forEach(function(name) {
                photos.push({
                    normal: path + name + ".jpeg",
                    mini: path + name + ".jpeg",
                    size: "300x300",
                    desc: name
                });
            });
            var ps = new photoSwipe({
                photoData: photos
            });
            psTpl = ps.start();
            ec = $(activityTpl);
            e.content = ec[0];
            $(psTpl).appendTo(ec.find(".photoSwipeContainer"));
        },

        entered: function() {},
        exited: function() {}
    });
});