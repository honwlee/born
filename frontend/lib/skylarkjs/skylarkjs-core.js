/**
 * skylarkjs - An Elegant JavaScript Library and HTML5 Application Framework.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.3
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(t,n){function r(t,n){if("."!==t[0])return t;var r=n.split("/"),e=t.split("/");r.pop();for(var i=0;i<e.length;i++)"."!=e[i]&&(".."==e[i]?r.pop():r.push(e[i]));return r.join("/")}function e(t,n){var r=new XMLHttpRequest;r.onreadystatechange=function(){4==this.readyState&&n(this.response)},r.open("GET",t,!0),r.send(null)}var i=n.define,o=n.require,a="function"==typeof i&&i.amd,u=!a&&"undefined"!=typeof exports;if(!a&&!i){var s={};i=n.define=function(t,n,e){"function"==typeof e?(s[t]={factory:e,deps:n.map(function(n){return r(n,t)}),exports:null},o(t)):resolved[t]=e},o=n.require=function(t,n){function r(t){if(!s.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var n=s[t];if(!n.exports){var r=[];n.deps.forEach(function(t){r.push(o(t))}),n.exports=n.factory.apply(window,r)}return n.exports}var e="string"==typeof t;if(!n&&e)return r(t);e&&(t=[t]);var i=t.map(function(t){return r(t)});return n?void n.apply(null,i):i}}if(t(i,o),a)o.config({baseUrl:"./"});else{var c=o("skylarkjs");u?exports=c:n.skylarkjs=c}o(["skylarkjs"],function(t,r){e("./slax-config.json",function(r){if(!r)return void console.error("can't find the slax-config.json!");var e=JSON.parse(r);a&&o.config(e.runtime),e.contextPath&&(e.baseUrl=e.contextPath);var i=t.spa(e);n.go=function(t){i.go(t)},i.prepare().then(function(){i.run()})})})}(function(t,n){t("skylark-langx/skylark",[],function(){var t={};return t}),t("skylark-utils/skylark",["skylark-langx/skylark"],function(t){return t}),t("skylarkjs/skylark",["skylark-utils/skylark"],function(t){return t}),t("skylark-langx/langx",["./skylark"],function(t){function n(t,n){var r,e,i=function(){t.apply(null,e)};return function(){e=arguments,clearTimeout(r),r=setTimeout(i,n)}}function r(t){return z.call(t,function(t){return null!=t})}function e(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function i(t){try{return t?"true"==t||"false"!=t&&("null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?JSON.parse(t):t):t}catch(n){return t}}function o(t,n){var r,e,i,o,a;if(t)if(r=t.length,r===o){for(e in t)if(t.hasOwnProperty(e)&&(a=t[e],n.call(a,e,a)===!1))break}else for(i=0;i<r&&(a=t[i],n.call(a,i,a)!==!1);i++);return this}function a(t){if(l(t)){for(var n=[],r=0;r<t.length;r++){var e=t[r];if(l(e))for(var i=0;i<e.length;i++)n.push(e[i]);else n.push(e)}return n}return t}function u(t,n,r,e){return g(n)?n.call(t,r,e):n}function s(t){var t=t||window.location.href,n=t.split("?"),r={};return n.length>1&&n[1].split("&").forEach(function(t){var n=t.split("=");r[n[0]]=n[1]}),r}function c(t,n){if(!n)return-1;var r;if(n.indexOf)return n.indexOf(t);for(r=n.length;r--;)if(n[r]===t)return r;return-1}function f(t){return t instanceof Array}function l(t){return!(y(t)||t.nodeName&&"#text"==t.nodeName||"number"!=typeof t.length)}function p(t){return"boolean"==typeof t}function h(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function g(t){return"function"==I(t)}function v(t){return"object"==I(t)}function d(t){return v(t)&&!m(t)&&Object.getPrototypeOf(t)==Object.prototype}function y(t){return"string"==typeof t}function m(t){return t&&t==t.window}function k(t){return"undefined"!=typeof t}function w(t){return"number"==typeof t}function x(t){if(t){var n=location.protocol+"//"+location.hostname;return location.port&&(n+=":"+location.port),t.startsWith(n)}}function _(t){var n;for(n in t)if(null!==t[n])return!1;return!0}function b(t,n,r){return(r||[]).concat(Array.prototype.slice.call(t,n||0))}function E(t,n){var r,e,i,o=[];if(l(t))for(e=0;e<t.length;e++)r=n.call(t[e],t[e],e),null!=r&&o.push(r);else for(i in t)r=n.call(t[i],t[i],i),null!=r&&o.push(r);return a(o)}function j(t){return requestAnimationFrame(t),this}function A(t,n){var r=2 in arguments&&M.call(arguments,2);if(g(t)){var e=function(){return t.apply(n,r?r.concat(M.call(arguments)):arguments)};return e}if(y(n))return r?(r.unshift(t[n],t),A.apply(null,r)):A(t[n],t);throw new TypeError("expected function")}function O(t){return parseFloat(t)||0}function P(t){return null==t?"":String.prototype.trim.call(t)}function C(t,n){if(f(t)){var r=t.indexOf(n);r!=-1&&t.splice(r,1)}else if(d(t))for(var e in t)if(t[e]==n){delete t[e];break}return this}function R(t,n,r,e){for(var i in n)n.hasOwnProperty(i)&&(e&&void 0!==t[i]||(r&&(d(n[i])||f(n[i]))?(d(n[i])&&!d(t[i])&&(t[i]={}),f(n[i])&&!f(t[i])&&(t[i]=[]),R(t[i],n[i],r,e)):void 0!==n[i]&&(t[i]=n[i])));return t}function S(t){var n=M.call(arguments,0);return target=n.shift(),deep=!1,p(n[n.length-1])&&(deep=n.pop()),{target:target,sources:n,deep:deep}}function T(){var t=S.apply(this,arguments);return t.sources.forEach(function(n){R(t.target,n,t.deep,!1)}),t.target}function N(){var t=S.apply(this,arguments);return t.sources.forEach(function(n){R(t.target,n,t.deep,!0)}),t.target}function D(t,n,r,e){function i(t,n){if(t.match(/\./)){var r,e=function(t,n){var i=t.pop();return i?n[i]?e(t,r=n[i]):null:r};return e(t.split(".").reverse(),n)}return n[t]}return e=e||window,r=r?A(e,r):function(t){return t},t.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(t,o,a){var u=i(o,n);return a&&(u=i(a,e).call(e,u,o)),r(u,o).toString()})}function U(t){return t._uid||t.id||(t._uid=V++)}function H(t){return z.call(t,function(n,r){return t.indexOf(n)==r})}function L(){return L}var F={}.toString,M=(Array.prototype.concat,Array.prototype.indexOf,Array.prototype.slice),z=Array.prototype.filter,$=function(){function t(t,n,r){var e=t.prototype,i=t.superclass.prototype,o=r&&r.noOverrided;for(var a in n)"constructor"!==a&&(e[a]="function"!=typeof n[a]||o||"function"!=typeof i[a]?n[a]:function(t,n,r){return function(){var t=this.overrided;this.overrided=r;var e=n.apply(this,arguments);return this.overrided=t,e}}(a,n[a],i[a]));return t}return function n(r,e,i){var o=r.constructor;o===Object&&(o=function(){this.init&&this.init.apply(this,arguments)});var a=r.klassName||"",u=new Function("return function "+a+"() {var inst = this, ctor = arguments.callee;if (!(inst instanceof ctor)) {inst = Object.create(ctor.prototype);}ctor._constructor.apply(inst, arguments);return inst;}")();return u._constructor=o,e=e||Object,u.prototype=Object.create(e.prototype),u.prototype.constructor=u,u.superclass=e,u.__proto__=e,u.partial||(u.partial=function(n,r){return t(this,n,r)}),u.inherit||(u.inherit=function(t,r){return n(t,this,r)}),u.partial(r,i),u}}(),q=function(){this.promise=new Promise(function(t,n){this._resolve=t,this._reject=n}.bind(this)),this.resolve=q.prototype.resolve.bind(this),this.reject=q.prototype.reject.bind(this)};q.prototype.resolve=function(t){return this._resolve.call(this.promise,t),this},q.prototype.reject=function(t){return this._reject.call(this.promise,t),this},q.prototype.then=function(t,n,r){return this.promise.then(t,n,r)},q.all=function(t){return Promise.all(t)},q.first=function(t){return Promise.race(t)},q.when=function(t,n,r,e){var i=t&&"function"==typeof t.then,o=i&&t instanceof Promise;if(!i)return arguments.length>1?n?n(t):t:(new q).resolve(t);if(!o){var a=new q(t.cancel);t.then(a.resolve,a.reject,a.progress),t=a.promise}return n||r||e?t.then(n,r,e):t},q.reject=function(t){var n=new q;return n.reject(t),n.promise},q.resolve=function(t){var n=new q;return n.resolve(t),n.promise},q.immediate=q.resolve;var Z=$({on:function(t,n,r,e,i,a){var u=this,s=this._hub||(this._hub={});return d(t)?(i=e,o(t,function(t,e){u.on(t,n,r,e,i,a)}),this):(y(n)||g(e)||(i=e,e=r,r=n,n=void 0),g(r)&&(i=e,e=r,r=null),y(t)&&(t=t.split(/\s/)),t.forEach(function(t){(s[t]||(s[t]=[])).push({fn:e,selector:n,data:r,ctx:i,one:a})}),this)},one:function(t,n,r,e,i){return this.on(t,n,r,e,i,1)},trigger:function(t){if(!this._hub)return this;var n=this;y(t)&&(t=new CustomEvent(t));var e=M.call(arguments,1);return e=k(e)?[t].concat(e):[t],[t.type||t.name,"all"].forEach(function(i){var o=n._hub[i];if(o){for(var a=o.length,u=!1,s=0;s<a;s++){var c=o[s];t.data?c.data&&(t.data=T({},c.data,t.data)):t.data=c.data||null,c.fn.apply(c.ctx,e),c.one&&(o[s]=null,u=!0)}u&&(n._hub[i]=r(o))}}),this},listened:function(t){var n=(this._hub||(this._events={}))[t]||[];return n.length>0},listenTo:function(t,n,r,e){if(!t)return this;y(r)&&(r=this[r]),e?t.one(n,r,this):t.on(n,r,this);for(var i,o=this._listeningTo||(this._listeningTo=[]),a=0;a<o.length;a++)if(o[a].obj==t){i=o[a];break}i||o.push(i={obj:t,events:{}});var u=i.events,s=u[n]=u[n]||[];return s.indexOf(r)==-1&&s.push(r),this},listenToOnce:function(t,n,r){return this.listenTo(t,n,r,1)},off:function(t,n){var r=this._hub||(this._hub={});return y(t)&&(t=t.split(/\s/)),t.forEach(function(t){var e=r[t],i=[];if(e&&n)for(var o=0,a=e.length;o<a;o++)e[o].fn!==n&&e[o].fn._!==n&&i.push(e[o]);i.length?r[t]=i:delete r[t]}),this},unlistenTo:function(t,n,e){var i=this._listeningTo;if(!i)return this;for(var o=0;o<i.length;o++){var a=i[o];if(!t||t==a.obj){var u=a.events;for(var s in u)if(!n||n==s){listeningEvent=u[s];for(var c=0;c<listeningEvent.length;c++)e&&e!=listeningEvent[o]||(a.obj.off(s,listeningEvent[o],this),listeningEvent[o]=null);listeningEvent=u[s]=r(listeningEvent),_(listeningEvent)&&(u[s]=null)}_(u)&&(i[o]=null)}}return i=this._listeningTo=r(i),_(i)&&(this._listeningTo=null),this}}),I=(function(){var t;return function(n){return t||(t=document.createElement("a")),t.href=n,t.href}}(),function(){var t={};return o("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(n,r){t["[object "+r+"]"]=r.toLowerCase()}),function(n){return null==n?String(n):t[F.call(n)]||"object"}}()),V=1;return T(L,{camelCase:function(t){return t.replace(/-([\da-z])/g,function(t){return t.toUpperCase().replace("-","")})},compact:r,dasherize:e,debounce:n,Deferred:q,Evented:Z,deserializeValue:i,each:o,flatten:a,funcArg:u,getQueryParams:s,inArray:c,isArray:f,isArrayLike:l,isBoolean:p,isDefined:function(t){return void 0!==t},isDocument:h,isEmptyObject:_,isFunction:g,isObject:v,isPlainObject:d,isNumber:w,isString:y,isSameOrigin:x,isWindow:m,klass:function(t,n,r){return $(t,n,r)},lowerFirst:function(t){return t.charAt(0).toLowerCase()+t.slice(1)},makeArray:b,map:E,mixin:T,nextTick:j,proxy:A,removeItem:C,returnTrue:function(){return!0},returnFalse:function(){return!1},safeMixin:N,substitute:D,toPixel:O,trim:P,type:I,uid:U,uniq:H,upperFirst:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},URL:window.URL||window.webkitURL}),t.langx=L}),t("skylark-router/router",["skylark-langx/skylark","skylark-langx/langx"],function(t,n){function r(t,r){var e=new CustomEvent(t,r);return n.safeMixin(e,r)}function e(){return v}function i(t){if(v){var e=v.route.exit({path:v.path,params:v.params},!0);if(!e)return}if(d=v,v=t,!v.route){var i=a(v.path);v.route=i.route,v.params=i.params}var o=v.route.enter({path:v.path,params:v.params},!0);n.Deferred.when(o).then(function(){x.trigger(r("routing",{current:v,previous:d})),v.route.enter({path:v.path,params:v.params},!1),d&&d.route.exit({path:d.path,params:d.params},!1),x.trigger(r("routed",{current:v,previous:d}))})}function o(t,n){if(!n&&v&&v.path==t)return!1;var e=a(t);if(e)if(e.path=t,b.useHistoryApi){var o={path:t};window.history.pushState(o,document.title,(y+t).replace("//","/")),window.dispatchEvent(r("popstate",{state:o}))}else if(b.useHashbang){var u="#!"+t;window.location.hash!==u?window.location.hash=u:i(e)}else i(e);return!0}function a(t,r){var e=!1;return!r&&(e=w[t])?e:(n.each(k,function(n,r){var i=r.match(t);return!i||(e={route:r,params:i},!1)}),e&&!r&&(w[t]=e),e)}function u(t,n){var r,e=k[t];return e&&(r=e.path(n)),r}function s(){return d}function c(t){return n.isDefined(t)?(y=t,this):y}function f(){return x}function l(t){return n.isDefined(t)?(m=t,this):m}function p(t,r){if(n.isDefined(r)){var e={};return e[t]=r,h(e),this}return k[t]}function h(t){if(!n.isDefined(t))return n.mixin({},k);for(var r in t)k[r]=new b.Route(r,t[r])}function g(){null==b.useHashbang&&null==b.useHistoryApi&&(window.location.host?b.useHistoryApi=!0:b.useHashbang=!0);var t="";b.useHistoryApi?(t=window.location.pathname,void 0===y&&(y=t.replace(/\/$/,"")),t=t.replace(y,"")||m||"/"):t=b.useHashbang?window.location.hash.replace("#!","")||m||"/":"/",t.startsWith("/")||(t="/"+t),b.useHistoryApi?window.addEventListener("popstate",function(t){t.state&&i(t.state),t.preventDefault()}):b.useHashbang&&window.addEventListener("hashchange",function(t){i({path:window.location.hash.replace(/^#!/,"")}),t.preventDefault()}),o(t)}var v,d,y,m,k={},w={},x=new n.Evented,_=n.Evented.inherit({klassName:"Route",init:function(t,r){r=n.mixin({},r);var e=r.pathto||"",i=e,o=i.match(/\:([a-zA-Z0-9_]+)/g);null!==o?(o=o.map(function(t){return t.substring(1)}),i=i.replace(/\:([a-zA-Z0-9_]+)/g,"(.*?)")):o=[],i="*"===i?"(.*)":i.replace("/","\\/"),this._setting=r,this.name=t,this.pathto=e,this.paramNames=o,this.params=i,this.regex=new RegExp("^"+i+"$","");var a=this;["entering","entered","exiting","exited"].forEach(function(t){n.isFunction(r[t])&&a.on(t,r[t])})},enter:function(t,e){if(e){var i=this._entering(t),o=this;return n.Deferred.when(i).then(function(){var t=r("entering",{route:o,result:!0});return o.trigger(t),t.result})}return this._entered(t),this.trigger(r("entered",n.safeMixin({route:this},t))),this},exit:function(t,e){if(e){var i=this._exiting(t);if(!i)return!1;var o=r("exiting",{route:this,result:!0});return this.trigger(o),o.result}return this._exited(t),this.trigger(r("exited",n.safeMixin({route:this},t))),this},match:function(t){var n=this.paramNames,r=t.indexOf("?"),t=~r?t.slice(0,r):decodeURIComponent(t),e=this.regex.exec(t);if(!e)return!1;for(var i={},o=1,a=e.length;o<a;++o){var u=n[o-1],s=decodeURIComponent(e[o]);i[u]=s}return i},path:function(t){var n=this.pathto;return t&&(n=n.replace(/:([a-zA-Z0-9_]+)/g,function(n,r){return t[r]})),n},_entering:function(t){return!0},_entered:function(t){return!0},_exiting:function(t){return!0},_exited:function(t){return!0}}),b=function(){return b};return n.mixin(b,{Route:_,current:e,go:o,map:a,hub:f,off:function(){x.off.apply(x,arguments)},on:function(){x.on.apply(x,arguments)},one:function(){x.one.apply(x,arguments)},path:u,previous:s,baseUrl:c,homePath:l,route:p,routes:h,start:g,trigger:function(t){return x.trigger(t),this},useHistoryApi:null,useHashbang:null}),t.router=b}),t("skylarkjs/router",["skylark-router/router"],function(t){return t}),t("skylark-spa/spa",["skylark-langx/skylark","skylark-langx/langx","skylark-router/router"],function(t,r,e){function i(t,n){var e=new CustomEvent(t,n);return r.safeMixin(e,n)}var o,a=r.Deferred,u=e.Route=e.Route.inherit({klassName:"SpaRoute",init:function(t,n){this.overrided(t,n),this.content=n.content,this.data=n.data;var e=this;["preparing","rendering","rendered"].forEach(function(t){r.isFunction(n[t])&&e.on(t,n[t])})},_entering:function(t){return this._prepared?this:this.prepare()},getConfigData:function(t){return t?this.data[t]:this.data},prepare:function(){var t=new a,r=this._setting,e=r.controller,o=this.controller,u=this;r.content,r.contentPath;return e&&!o?n([e.type],function(n){o=u.controller=new n(e),t.resolve()}):t.resolve(),t.then(function(){var t=i("preparing",{route:u,result:!0});return u.trigger(t),a.when(t.result).then(function(){u._prepared=!0})})},render:function(t){var n=i("rendering",{route:this,context:t,content:this.content});return this.trigger(n),n.content},trigger:function(t){var n=this.controller;return n?n.perform(t):this.overrided(t)}}),s=r.Evented.inherit({klassName:"SpaRouteController",init:function(t,n){n=n||{},this.content=n.content,this.data=n.data},getConfigData:function(t){return t?this.data[t]:this.data},perform:function(t){var n=t.type;if(this[n])return this[n].call(this,t)}}),c=r.Evented.inherit({klassName:"SpaPage",init:function(t){t=r.mixin({routeViewer:"body"},t),this._params=t,this._rvc=document.querySelector(t.routeViewer),this._router=e,e.on("routed",r.proxy(this,"refresh"))},prepare:function(){},refresh:function(){var t=e.current(),n=(e.previous(),t.route.render(t));r.isString(n)?this._rvc.innerHTML=n:(this._rvc.innerHTML="",this._rvc.appendChild(n)),t.route.trigger(i("rendered",{content:n}))}}),f=r.Evented.inherit({klassName:"SpaPlugin",init:function(t,n){this.name=t,this._setting=n},prepare:function(){var t=new a,i=this._setting,o=i.controller,u=this.controller,s=this;return o&&!u?n([o.type],function(n){u=s.controller=new n(o),e.on(i.hookers,{plugin:s},r.proxy(u.perform,u)),t.resolve()}):(r.each(i.hookers,function(t,n){e.on(t,{plugin:s},n)}),t.resolve()),t.then(function(){s._prepared=!0})}}),l=r.Evented.inherit({klassName:"SpaPluginController",init:function(t){this.plugin=t},perform:function(t){var n=t.type;if(this[n])return this[n].call(this,t)}}),p=r.Evented.inherit({klassName:"SpaApplication",init:function(t){if(o)return o;var n=this._plugins={};t=this._config=r.mixin({plugins:{}},t,!0),r.each(t.plugins,function(t,r){n[t]=new f(t,r)}),e.routes(t.routes),this._router=e,this._page=new h.Page(t.page),document.title=t.title;var i=t.baseUrl;void 0===i&&(i=t.baseUrl=new r.URL(document.baseURI).pathname),e.baseUrl(i),t.homePath&&e.homePath(t.homePath),o=this},getConfig:function(t){return t?this._config[t]:this._config},go:function(t){return e.go(t),this},page:function(){return this._page},prepare:function(){if(this._prepared)return a.resolve();var t=this;e.trigger(i("starting",{spa:t}));var n=r.map(e.routes(),function(t,n){if(t.lazy===!1)return t.prepare()}),o=r.map(this._plugins,function(t,n){return t.prepare()});return a.all(n.concat(o)).then(function(){this._prepared=!0})},run:function(){this._router.start(),e.trigger(i("started",{spa:this}))}}),h=function(t){return o||(window[t.name||"app"]=o=new h.Application(t)),o};return r.mixin(h,{Application:p,Page:c,Plugin:f,PluginController:l,Route:u,RouteController:s}),t.spa=h}),t("skylarkjs/spa",["skylark-spa/spa"],function(t){return t}),t("skylarkjs/langx",["skylark-langx/langx"],function(t){return t}),t("skylarkjs/core",["./skylark","./router","./spa","./langx"],function(t){return t}),t("skylarkjs",["skylarkjs/core"],function(t){return t})},this);
//# sourceMappingURL=sourcemaps/skylarkjs-core.js.map
