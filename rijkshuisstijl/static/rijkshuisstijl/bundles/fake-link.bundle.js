(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{314:function(n,t,e){"use strict";e.r(t),e.d(t,"FakeLink",(function(){return u}));var r=e(1),i=e.n(r),o=e(120);function a(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function c(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}var s,u=function(){function n(t){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.node=t,this.href=this.node.dataset.href,this.bindEvents()}var t,e,r;return t=n,(e=[{key:"bindEvents",value:function(){i.a.hasModifier(this.node,o.b)?this.node.addEventListener("dblclick",this.navigate.bind(this)):this.node.addEventListener("click",this.navigate.bind(this))}},{key:"navigate",value:function(){window.location=this.href}}])&&c(t.prototype,e),r&&c(t,r),n}();(s=o.a,function(n){if(Array.isArray(n))return a(n)}(s)||function(n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(n))return Array.from(n)}(s)||function(n,t){if(n){if("string"==typeof n)return a(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?a(n,t):void 0}}(s)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).forEach((function(n){return new u(n)}))}}]);