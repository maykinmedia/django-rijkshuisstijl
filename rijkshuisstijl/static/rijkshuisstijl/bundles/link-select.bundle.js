(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{318:function(n,e,t){"use strict";t.r(e),t.d(e,"LinkSelect",(function(){return o}));var r=t(49);function a(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}var i,o=function(){function n(e){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.node=e,this.bindEvents()}var e,t,r;return e=n,(t=[{key:"bindEvents",value:function(){this.node.addEventListener("change",this.navigate.bind(this))}},{key:"navigate",value:function(){var n=this.node.dataset.target,e=this.node.value||this.node.dataset.value;"_blank"!==n?location.href=e:window.open(e)}}])&&a(e.prototype,t),r&&a(e,r),n}();(i=r.e,function(n){if(Array.isArray(n)){for(var e=0,t=new Array(n.length);e<n.length;e++)t[e]=n[e];return t}}(i)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()).forEach((function(n){return new o(n)}))}}]);
//# sourceMappingURL=link-select.bundle.js.map