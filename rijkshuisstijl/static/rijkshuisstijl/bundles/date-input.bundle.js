(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{306:function(e,t,n){!function(e){"use strict";var t="undefined"!=typeof window&&void 0!==window.flatpickr?window.flatpickr:{l10ns:{}},n={weekdays:{shorthand:["zo","ma","di","wo","do","vr","za"],longhand:["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"]},months:{shorthand:["jan","feb","mrt","apr","mei","jun","jul","aug","sept","okt","nov","dec"],longhand:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"]},firstDayOfWeek:1,weekAbbreviation:"wk",rangeSeparator:" tot ",scrollTitle:"Scroll voor volgende / vorige",toggleTitle:"Klik om te wisselen",time_24hr:!0,ordinal:function(e){return 1===e||8===e||e>=20?"ste":"de"}};t.l10ns.nl=n;var a=t.l10ns;e.Dutch=n,e.default=a,Object.defineProperty(e,"__esModule",{value:!0})}(t)},316:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(302),i=n.n(o),d=n(306),l=n(39);function u(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function s(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.node=t,this.update()}var t,n,a;return t=e,(n=[{key:"getDateFormat",value:function(){return this.node.dataset.dateFormat?this.node.dataset.dateFormat:this.isDateTime()?"d-m-Y H:1":"d-m-Y"}},{key:"getLocale",value:function(){var e=d.Dutch;return e.firstDayOfWeek=0,e}},{key:"getMode",value:function(){return r.a.hasModifier(this.node,l.h)?"range":"single"}},{key:"isDateTime",value:function(){return"datetime"===this.node.type}},{key:"updatePlaceholder",value:function(){if(!this.node.placeholder){var e=this.getDateFormat().replace("d","dd").replace("m","mm").replace("Y","yyyy");this.node.placeholder=e}}},{key:"update",value:function(){this.updatePlaceholder(),i()(this.node,{altInput:!0,altFormat:this.getDateFormat(),dateFormat:"Y-m-d",defaultDate:this.node.value.split("/"),locale:this.getLocale(),mode:this.getMode()}).l10n.rangeSeparator="/"}}])&&s(t.prototype,n),a&&s(t,a),e}();[].concat(u(l.c),u(l.d)).forEach((function(e){return new c(e)}))}}]);
//# sourceMappingURL=date-input.bundle.js.map