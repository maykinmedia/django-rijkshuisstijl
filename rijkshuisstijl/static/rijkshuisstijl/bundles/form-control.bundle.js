(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{316:function(t,e,n){"use strict";n.r(e);var i=n(49);function a(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.node=e,this.bindEvents(),this.update()}var e,n,i;return e=t,(n=[{key:"getInputs",value:function(){return a(this.node.querySelectorAll("input, select, textarea"))}},{key:"getNamedInputs",value:function(){return this.getInputs().filter((function(t){return t.name}))}},{key:"bindEvents",value:function(){this.node.addEventListener("change",this.update.bind(this)),this.node.addEventListener("input",this.update.bind(this)),this.node.addEventListener("click",this.update.bind(this)),this.node.addEventListener("touchend",this.update.bind(this)),this.node.addEventListener("keyup",this.update.bind(this))}},{key:"update",value:function(){setTimeout(this._update.bind(this))}},{key:"_update",value:function(){var t=this;try{var e=this.getNamedInputs(),n=a(new Set(e.map((function(t){return t.name}))));n.length?this.node.dataset.inputNames=n:delete this.node.dataset.inputNames,e.forEach((function(e){var n="".concat(e.name,"Value"),i=e.value;if(("checkbox"!==e.type||e.checked)&&("radio"!==e.type||e.checked)){if(e.multiple&&e.options){var r=a(e.options).filter((function(t){return t.selected})).map((function(t){return t.value||t.textContent}));i=!!r.length&&r}i?t.node.dataset[n]=i:delete t.node.dataset[n]}})),e.filter((function(t){return t.checked&&t.value})).forEach((function(e){var n="".concat(e.name,"Value");t.node.dataset[n]=e.value}))}catch(t){var i=this.node.dataset.inputNames||this.node.id||this.node;console.warn("Unable to inspect form control (".concat(i,"), got error: ").concat(t,"."))}}}])&&r(e.prototype,n),i&&r(e,i),t}();a(i.c).forEach((function(t){return new o(t)}))}}]);
//# sourceMappingURL=form-control.bundle.js.map