(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{334:function(n,t,e){"use strict";e.r(t),e.d(t,"Paginator",(function(){return h}));var i=e(1),a=e.n(i),r=e(307),o=e.n(r),s=e(123);function u(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}var c,h=function(){function n(t){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.node=t,this.input=a.a.getChildBEMNode(this.node,s.a),this.bindEvents()}var t,e,i;return t=n,(e=[{key:"bindEvents",value:function(){this.node.addEventListener("submit",this.onChange.bind(this)),this.node.addEventListener("change",this.onChange.bind(this)),this.node.addEventListener("click",this.onClick.bind(this))}},{key:"onChange",value:function(n){n.preventDefault(),this.navigate()}},{key:"onClick",value:function(n){n.preventDefault(),n.target.dataset.page&&this.navigate(n.target.dataset.page)}},{key:"navigate",value:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.input.value;window.location=o()(window.location).setSearch(this.input.name,n)}}])&&u(t.prototype,e),i&&u(t,i),n}();(c=s.b,function(n){if(Array.isArray(n)){for(var t=0,e=new Array(n.length);t<n.length;t++)e[t]=n[t];return e}}(c)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(c)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()).forEach((function(n){return new h(n)}))}}]);
//# sourceMappingURL=paginator.bundle.js.map