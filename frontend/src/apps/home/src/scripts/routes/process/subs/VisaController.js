define([
    "jquery",
    "skylarkjs",
    "../ProcessController"
], function($, skylarkjs, ProcessController) {
    var spa = skylarkjs.spa;
    return ProcessController.inherit({
        klassName: "ProcessCertificateController",

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