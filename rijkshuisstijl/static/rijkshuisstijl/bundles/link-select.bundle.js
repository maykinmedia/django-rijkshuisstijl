(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{320:function(n,t,e){"use strict";e.r(t),e.d(t,"LinkSelect",(function(){return o}));var r=e(29);function a(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}var i,o=function(){function n(t){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.node=t,this.bindEvents()}var t,e,r;return t=n,(e=[{key:"bindEvents",value:function(){this.node.addEventListener("change",this.navigate.bind(this))}},{key:"navigate",value:function(){var n=this.node.dataset.target,t=this.node.value||this.node.dataset.value;"_blank"!==n?location.href=t:window.open(t)}}])&&a(t.prototype,e),r&&a(t,r),n}();(i=r.g,function(n){if(Array.isArray(n)){for(var t=0,e=new Array(n.length);t<n.length;t++)e[t]=n[t];return e}}(i)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()).forEach((function(n){return new o(n)}))}}]);
//# sourceMappingURL=link-select.bundle.js.map