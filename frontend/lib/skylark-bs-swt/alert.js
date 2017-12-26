/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","./sbswt"],function(t,e,r,s,a,n,l,i){"use strict";function o(t){return this.each(function(){var e=l(this),r=e.data("bs.alert");r||e.data("bs.alert",r=new c(this)),"string"==typeof t&&r[t].call(e)})}var u='[data-dismiss="alert"]',c=i.Alert=i.WidgetBase.inherit({klassName:"Alert",init:function(t,e){l(t).on("click",u,this.close)},close:function(t){function s(){i.detach().trigger("closed.bs.alert").remove()}var a=l(this),n=a.attr("data-target");n||(n=a.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,""));var i=l("#"===n?[]:n);t&&t.preventDefault(),i.length||(i=a.closest(".alert")),i.trigger(t=r.create("close.bs.alert")),t.isDefaultPrevented()||(i.removeClass("in"),e.support.transition&&(i.hasClass("fade")?i.one("bsTransitionEnd",s).emulateTransitionEnd(c.TRANSITION_DURATION):s()))}});c.VERSION="3.3.7",c.TRANSITION_DURATION=150;var f=l.fn.alert;return l.fn.alert=o,l.fn.alert.Constructor=c,l.fn.alert.noConflict=function(){return l.fn.alert=f,this},l.fn.alert});
//# sourceMappingURL=sourcemaps/alert.js.map
