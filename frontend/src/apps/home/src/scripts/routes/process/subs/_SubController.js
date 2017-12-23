define([
    "jquery",
    "skylarkjs",
    "server",
    "../ProcessController"
], function($, skylarkjs, server, ProcessController) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx;
    return ProcessController.inherit({
        klassName: "_SubController",
        preparing: function(e) {
            if (this.pageData) {
                e.result = langx.Deferred.when(true);
            } else {
                var self = this;
                e.result = server().connect("pages", "get", "show?key=name&&value=process").then(function(data) {
                    self.pageData = data;
                });
            }
        }
    });
});