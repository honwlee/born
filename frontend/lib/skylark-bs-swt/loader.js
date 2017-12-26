/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","./sbswt"],function(e,t,n,r,i,o,s,a){var l=s.fn.loader,u=a.Loader=a.WidgetBase.inherit({klassName:"Loader",init:function(t,n){this.$element=s(t),this.options=e.mixin({},s.fn.loader.defaults,n)},destroy:function(){return this.$element.remove(),this.$element[0].outerHTML},ieRepaint:function(){},msieVersion:function(){},next:function(){},pause:function(){},play:function(){},previous:function(){},reset:function(){}});return s.fn.loader=function(e){var t,n=Array.prototype.slice.call(arguments,1),r=this.each(function(){var r=s(this),i=r.data("fu.loader"),o="object"==typeof e&&e;i||r.data("fu.loader",i=new u(this,o)),"string"==typeof e&&(t=i[e].apply(i,n))});return void 0===t?r:t},s.fn.loader.defaults={},s.fn.loader.Constructor=u,s.fn.loader.noConflict=function(){return s.fn.loader=l,this},s.fn.loader});
//# sourceMappingURL=sourcemaps/loader.js.map
