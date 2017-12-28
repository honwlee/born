/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","./sbswt"],function(t,i,s,e,n,o,h,p){var u=h.fn.spinbox,a=p.Spinbox=p.WidgetBase.inherit({klassName:"Spinbox",init:function(i,s){this.$element=h(i),this.$element.find(".btn").on("click",function(t){t.preventDefault()}),this.options=t.mixin({},h.fn.spinbox.defaults,s),this.options.step=this.$element.data("step")||this.options.step,this.options.value<this.options.min?this.options.value=this.options.min:this.options.max<this.options.value&&(this.options.value=this.options.max),this.$input=this.$element.find(".spinbox-input"),this.$input.on("focusout.fu.spinbox",this.$input,t.proxy(this.change,this)),this.$element.on("keydown.fu.spinbox",this.$input,t.proxy(this.keydown,this)),this.$element.on("keyup.fu.spinbox",this.$input,t.proxy(this.keyup,this)),this.options.hold?(this.$element.on("mousedown.fu.spinbox",".spinbox-up",t.proxy(function(){this.startSpin(!0)},this)),this.$element.on("mouseup.fu.spinbox",".spinbox-up, .spinbox-down",t.proxy(this.stopSpin,this)),this.$element.on("mouseout.fu.spinbox",".spinbox-up, .spinbox-down",t.proxy(this.stopSpin,this)),this.$element.on("mousedown.fu.spinbox",".spinbox-down",t.proxy(function(){this.startSpin(!1)},this))):(this.$element.on("click.fu.spinbox",".spinbox-up",t.proxy(function(){this.step(!0)},this)),this.$element.on("click.fu.spinbox",".spinbox-down",t.proxy(function(){this.step(!1)},this))),this.switches={count:1,enabled:!0},"medium"===this.options.speed?this.switches.speed=300:"fast"===this.options.speed?this.switches.speed=100:this.switches.speed=500,this.options.defaultUnit=r(this.options.defaultUnit,this.options.units)?this.options.defaultUnit:"",this.unit=this.options.defaultUnit,this.lastValue=this.options.value,this.render(),this.options.disabled&&this.disable()},destroy:function(){return this.$element.remove(),this.$element.find("input").each(function(){h(this).attr("value",h(this).val())}),this.$element[0].outerHTML},render:function(){this._setValue(this.getDisplayValue())},change:function(){this._setValue(this.getDisplayValue()),this.triggerChangedEvent()},stopSpin:function(){void 0!==this.switches.timeout&&(clearTimeout(this.switches.timeout),this.switches.count=1,this.triggerChangedEvent())},triggerChangedEvent:function(){var t=this.getValue();t!==this.lastValue&&(this.lastValue=t,this.$element.trigger("changed.fu.spinbox",t))},startSpin:function(i){if(!this.options.disabled){var s=this.switches.count;1===s?(this.step(i),s=1):s=s<3?1.5:s<8?2.5:4,this.switches.timeout=setTimeout(t.proxy(function(){this.iterate(i)},this),this.switches.speed/s),this.switches.count++}},iterate:function(t){this.step(t),this.startSpin(t)},step:function(t){this._setValue(this.getDisplayValue());var i;i=t?this.options.value+this.options.step:this.options.value-this.options.step,i=i.toFixed(5),this._setValue(i+this.unit)},getDisplayValue:function(){var t=this.parseInput(this.$input.val()),i=t?t:this.options.value;return i},setDisplayValue:function(t){this.$input.val(t)},getValue:function(){var t=this.options.value;return"."!==this.options.decimalMark&&(t=(t+"").split(".").join(this.options.decimalMark)),t+this.unit},setValue:function(t){return this._setValue(t,!0)},_setValue:function(t,i){if("."!==this.options.decimalMark&&(t=this.parseInput(t)),"number"!=typeof t){var s=t.replace(/[0-9.-]/g,"");this.unit=r(s,this.options.units)?s:this.options.defaultUnit}var e=this.getIntValue(t);return isNaN(e)&&!isFinite(e)?this._setValue(this.options.value,i):(e=d.call(this,e),this.options.value=e,t=e+this.unit,"."!==this.options.decimalMark&&(t=(t+"").split(".").join(this.options.decimalMark)),this.setDisplayValue(t),i&&(this.lastValue=t),this)},value:function(t){return t||0===t?this.setValue(t):this.getValue()},parseInput:function(t){return t=(t+"").split(this.options.decimalMark).join(".")},getIntValue:function(t){if(t="undefined"==typeof t?this.getValue():t,"undefined"!=typeof t)return"string"==typeof t&&(t=this.parseInput(t)),t=parseFloat(t,10)},disable:function(){this.options.disabled=!0,this.$element.addClass("disabled"),this.$input.attr("disabled",""),this.$element.find("button").addClass("disabled")},enable:function(){this.options.disabled=!1,this.$element.removeClass("disabled"),this.$input.removeAttr("disabled"),this.$element.find("button").removeClass("disabled")},keydown:function(t){var i=t.keyCode;38===i?this.step(!0):40===i?this.step(!1):13===i&&this.change()},keyup:function(t){var i=t.keyCode;38!==i&&40!==i||this.triggerChangedEvent()}}),l=function(t,i){return Math.round(t/i)*i},r=function(i,s){var e=!1,n=i.toLowerCase();return t.each(s,function(t,i){if(i=i.toLowerCase(),n===i)return e=!0,!1}),e},d=function(t){return isNaN(parseFloat(t))?t:(t>this.options.max?t=this.options.cycle?this.options.min:this.options.max:t<this.options.min&&(t=this.options.cycle?this.options.max:this.options.min),this.options.limitToStep&&this.options.step&&(t=l(t,this.options.step),t>this.options.max?t-=this.options.step:t<this.options.min&&(t+=this.options.step)),t)};return h.fn.spinbox=function(t){var i,s=Array.prototype.slice.call(arguments,1),e=this.each(function(){var e=h(this),n=e.data("fu.spinbox"),o="object"==typeof t&&t;n||e.data("fu.spinbox",n=new a(this,o)),"string"==typeof t&&(i=n[t].apply(n,s))});return void 0===i?e:i},h.fn.spinbox.defaults={value:0,min:0,max:999,step:1,hold:!0,speed:"medium",disabled:!1,cycle:!1,units:[],decimalMark:".",defaultUnit:"",limitToStep:!1},h.fn.spinbox.Constructor=a,h.fn.spinbox.noConflict=function(){return h.fn.spinbox=u,this},h.fn.spinbox});
//# sourceMappingURL=sourcemaps/spinbox.js.map