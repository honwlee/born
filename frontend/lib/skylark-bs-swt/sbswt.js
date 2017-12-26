/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/skylark","skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/query"],function(e,t,E,i,s,r,n){var l=e.ui=e.ui||{},u=l.sbswt={},O={BACKSPACE_KEYCODE:8,COMMA_KEYCODE:188,DELETE_KEYCODE:46,DOWN_ARROW_KEYCODE:40,ENTER_KEYCODE:13,TAB_KEYCODE:9,UP_ARROW_KEYCODE:38},a=function(e){return e.shiftKey===!0},k=function(e){return function(t){return t.keyCode===e}},C=k(O.BACKSPACE_KEYCODE),D=k(O.DELETE_KEYCODE),K=k(O.TAB_KEYCODE),_=k(O.UP_ARROW_KEYCODE),y=k(O.DOWN_ARROW_KEYCODE),o=/&[^\s]*;/,A=function(e){for(;o.test(e);)e=n("<i>").html(e).text();return n("<i>").text(e).html()};t.mixin(u,{CONST:O,cleanInput:A,isBackspaceKey:C,isDeleteKey:D,isShiftHeld:a,isTabKey:K,isUpArrow:_,isDownArrow:y});var Y=t.Evented.inherit({klassName:"WidgetBase"});return t.mixin(u,{WidgetBase:Y}),u});
//# sourceMappingURL=sourcemaps/sbswt.js.map
