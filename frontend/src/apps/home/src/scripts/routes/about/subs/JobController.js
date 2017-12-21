define([
    "skylarkjs",
    "../AboutController"
], function(skylarkjs, AboutController) {
    var spa = skylarkjs.spa,
        $ = skylarkjs.query;
    return AboutController.inherit({
        klassName: "AboutJobController",
        rendered: function() {
            $('#aTabList a[href="#aJob"]').tab('show');
            $("#aTabList").find('a').off('shown.bs.tab').on('shown.bs.tab', function(e) {
                var path = $(e.currentTarget).data("path");
                window.go(path, true);
            });
            $('[data-toggle="tab"]').each(function() {
                var $this = $(this);
                $this.tab();
            });
            $('[data-toggle="dropdown"]').dropdown();
        }
    });
});