(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{310:function(e,t,n){!function(e){"use strict";var t="undefined"!=typeof window&&void 0!==window.flatpickr?window.flatpickr:{l10ns:{}},n={weekdays:{shorthand:["zo","ma","di","wo","do","vr","za"],longhand:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]},months:{shorthand:["jan","feb","mrt","apr","mei","jun","jul","aug","sept","okt","nov","dec"],longhand:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"]},firstDayOfWeek:1,weekAbbreviation:"wk",rangeSeparator:" tot ",scrollTitle:"Scroll voor volgende / vorige",toggleTitle:"Klik om te wisselen",time_24hr:!0,ordinal:function(e){return 1===e||8===e||e>=20?"ste":"de"}};t.l10ns.nl=n;var a=t.l10ns;e.Dutch=n,e.default=a,Object.defineProperty(e,"__esModule",{value:!0})}(t)},322:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(305),i=n.n(o),u=n(310),l=n(24);function d(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function c(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.node=t,this.update()}var t,n,a;return t=e,(n=[{key:"getDateFormat",value:function(){return this.node.dataset.dateFormat?this.node.dataset.dateFormat:this.isDateTime()?"d-m-Y H:1":"d-m-Y"}},{key:"getLocale",value:function(){var e=u.Dutch;return e.firstDayOfWeek=1,e}},{key:"getMode",value:function(){return r.a.hasModifier(this.node,l.k)?"range":"single"}},{key:"isDateTime",value:function(){return"datetime"===this.node.type}},{key:"onReady",value:function(e,t,n){this.copyAttrs(n.altInput),this.cleanValue()}},{key:"copyAttrs",value:function(e){var t=e.attributes,n=["form","name","value"];d(this.node.attributes).forEach((function(a){a.name in t||-1!==n.indexOf(a.name)||e.setAttribute(a.name,a.value)}))}},{key:"cleanValue",value:function(){this.node.value.match(/\d/)||(this.node.value="")}},{key:"updateClassName",value:function(){r.a.addModifier(this.node,l.j)}},{key:"updatePlaceholder",value:function(){if(!this.node.placeholder){var e=this.getDateFormat().replace("d","dd").replace("m","mm").replace("Y","yyyy");this.node.placeholder=e}}},{key:"update",value:function(){this.updateClassName(),this.updatePlaceholder(),i()(this.node,{altInput:!0,altInputClass:this.node.className,altFormat:this.getDateFormat(),dateFormat:"Y-m-d",defaultDate:this.node.value.split("/"),locale:this.getLocale(),mode:this.getMode(),onReady:this.onReady.bind(this)}).l10n.rangeSeparator="/"}}])&&c(t.prototype,n),a&&c(t,a),e}();[].concat(d(l.c),d(l.d)).forEach((function(e){return new f(e)}))}}]);
//# sourceMappingURL=date-input.bundle.js.map