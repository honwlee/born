define([
    "skylarkjs",
    "text!scripts/routes/process/subs/certificate.html"
], function(skylarkjs, certificateTpl) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return spa.RouteController.inherit({
        klassName: "ProcessCertificateController",

        rendering: function(e) {
            e.content = certificateTpl;
        },

        entered: function() {},
        exited: function() {}
    });
});