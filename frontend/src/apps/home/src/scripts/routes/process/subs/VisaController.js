define([
    "jquery",
    "skylarkjs",
    "text!scripts/routes/process/process.html"
], function($, skylarkjs, processTpl) {
    var spa = skylarkjs.spa;
    return spa.RouteController.inherit({
        klassName: "ProcessCertificateController",

        rendering: function(e) {
            e.content = processTpl;
        },

        rendered: function() {
            $('#pTabList a[href="#pVisa"]').tab('show');
            $("#pTabList").find('a').off('shown.bs.tab').on('shown.bs.tab', function(e) {
                var path = $(e.currentTarget).data("path");
                window.go(path, true);
            });
            $('[data-toggle="tab"]').each(function() {
                var $this = $(this);
                $this.tab();
            });
            $('[data-toggle="dropdown"]').dropdown();
        },
        exited: function() {}
    });
});