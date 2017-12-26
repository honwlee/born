/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","./sbswt"],function(n,t,i,r,s,e,o,a){"use strict";function u(){var n=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in t)if(void 0!==n.style[i])return{end:t[i]};return!1}o.fn.emulateTransitionEnd=function(n){var i=!1,r=this;o(this).one("bsTransitionEnd",function(){i=!0});var s=function(){i||o(r).trigger(t.support.transition.end)};return setTimeout(s,n),this},o(function(){t.support.transition=u(),t.support.transition&&(i.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(n){if(o(n.target).is(this))return n.handleObj.handler.apply(this,arguments)}})})});
//# sourceMappingURL=sourcemaps/transition.js.map
