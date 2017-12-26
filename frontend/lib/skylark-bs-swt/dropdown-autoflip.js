/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/query"],function(o,t,e,n,r,i){function f(o){i(o).css({visibility:"hidden"}),s(o)?o.parent().addClass("dropup"):o.parent().removeClass("dropup"),i(o).css({visibility:"visible"})}function s(o){var t=a(o),e={};return e.parentHeight=o.parent().outerHeight(),e.parentOffsetTop=o.parent().offset().top,e.dropdownHeight=o.outerHeight(),e.containerHeight=t.overflowElement.outerHeight(),e.containerOffsetTop=t.isWindow?t.overflowElement.scrollTop():t.overflowElement.offset().top,e.fromTop=e.parentOffsetTop-e.containerOffsetTop,e.fromBottom=e.containerHeight-e.parentHeight-(e.parentOffsetTop-e.containerOffsetTop),!(e.dropdownHeight<e.fromBottom)&&(e.dropdownHeight<e.fromTop||(e.dropdownHeight>=e.fromTop&&e.dropdownHeight>=e.fromBottom?e.fromTop>=e.fromBottom:void 0))}function a(t){var e,n=t.attr("data-target"),r=!0;return n?"window"!==n&&(e=i(n),r=!1):o.each(t.parents(),function(o,t){if("visible"!==i(t).css("overflow"))return e=t,r=!1,!1}),r&&(e=window),{overflowElement:i(e),isWindow:r}}i(document).on("click.fu.dropdown-autoflip","[data-toggle=dropdown][data-flip]",function(o){"auto"===i(this).data().flip&&f(i(this).next(".dropdown-menu"))}),i(document).on("suggested.fu.pillbox",function(o,t){f(i(t)),i(t).parent().addClass("open")}),i.fn.dropdownautoflip=function(){}});
//# sourceMappingURL=sourcemaps/dropdown-autoflip.js.map
