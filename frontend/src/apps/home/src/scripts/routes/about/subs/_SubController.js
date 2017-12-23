define([
    "jquery",
    "skylarkjs",
    "server",
    "../AboutController"
], function($, skylarkjs, server, AboutController) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return AboutController.inherit({
        klassName: "_SubController",
        preparing: function(e) {
            if (this.pageData) {
                e.result = langx.Deferred.when(true);
            } else {
                var self = this;
                e.result = server().connect("pages", "get", "show?key=name&&value=about").then(function(data) {
                    self.pageData = data;
                });
            }

        }
    });
});