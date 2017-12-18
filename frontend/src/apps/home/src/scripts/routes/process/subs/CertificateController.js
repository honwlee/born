define([
    "jquery",
    "skylarkjs",
    "../ProcessController",
    "text!scripts/routes/process/process.hbs"
], function($, skylarkjs, ProcessController, processTpl) {
    var spa = skylarkjs.spa;
    return ProcessController.inherit({
        klassName: "ProcessCertificateController",
        rendered: function() {
            $('#pTabList a[href="#pCertificate"]').tab('show');
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
    });
});