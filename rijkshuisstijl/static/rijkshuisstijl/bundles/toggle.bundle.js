(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{326:function(t,e,o){"use strict";o.r(e),o.d(e,"Toggle",(function(){return l}));var n=o(1),a=o.n(n),i=o(87);function r(t){return function(t){if(Array.isArray(t)){for(var e=0,o=new Array(t.length);e<t.length;e++)o[e]=t[e];return o}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function s(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var l=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.node=e,this.toggleModifier=this.node.dataset.toggleModifier,this.toggleMobileState=this.node.dataset.toggleMobileState?"TRUE"===this.node.dataset.toggleMobileState.toUpperCase():void 0,this.restoreState(),this.bindEvents()}var e,o,n;return e=t,(o=[{key:"bindEvents",value:function(){this.node.addEventListener("click",this.onClick.bind(this))}},{key:"onClick",value:function(t){var e=this,o=this.node.dataset.toggleLinkMode||"normal";"normal"===o?t.target.getAttribute("href")&&"#"!==t.target.getAttribute("href")||(t.preventDefault(),t.stopPropagation()):"positive"===o?t.target.href&&this.getState()||(t.preventDefault(),t.stopPropagation()):"negative"===o?t.target.href&&!this.getState()||(t.preventDefault(),t.stopPropagation()):"prevent"===o&&(t.preventDefault(),t.stopPropagation()),setTimeout((function(){e.toggle(),e.saveState(),e.focus()}),100)}},{key:"focus",value:function(){var t=this.node.dataset.focusTarget;t&&this.getState()&&document.querySelector(t).focus()}},{key:"toggle",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;"add"===this.node.dataset.toggleOperation?e=!0:"remove"===this.node.dataset.toggleOperation&&(e=!1);var o=this.getTargets();o.forEach((function(o){a.a.toggleModifier(o,t.toggleModifier,e),t.dispatchEvent(o)})),this.getExclusive().filter((function(t){return-1===o.indexOf(t)})).forEach((function(e){return a.a.removeModifier(e,t.toggleModifier)}))}},{key:"dispatchEvent",value:function(t){var e=document.createEvent("Event");e.initEvent("rh-toggle",!0,!0),t.dispatchEvent(e)}},{key:"getState",value:function(){var t=this.getTargets()[0];return t?Boolean(a.a.hasModifier(t,this.toggleModifier)):null}},{key:"getTargets",value:function(){var t=this.node.dataset.toggleTarget;return this.getRelated(t)}},{key:"getExclusive",value:function(){var t=this.node.dataset.toggleExclusive||"";return this.getRelated(t)}},{key:"getRelated",value:function(t){var e=[];return t.split(",").filter((function(t){return t.length})).forEach((function(t){return e=[].concat(r(e),r(document.querySelectorAll(t)))})),e}},{key:"saveState",value:function(){var t=this.node.id,e=this.getState();if("boolean"==typeof e&&t){var o="ToggleButton#".concat(t,".modifierApplied");try{localStorage.setItem(o,e)}catch(t){console.warn(this,"Unable to save state to localstorage")}}}},{key:"restoreState",value:function(){if(void 0!==this.toggleMobileState&&matchMedia("(max-width: 767px)").matches)this.toggle(this.toggleMobileState);else{var t=this.node.id;if(t){var e="ToggleButton#".concat(t,".modifierApplied");try{var o=localStorage.getItem(e)||!1;this.toggle("TRUE"===o.toUpperCase())}catch(t){}}}}}])&&s(e.prototype,o),n&&s(e,n),t}();r(i.b).forEach((function(t){return new l(t)}))}}]);
//# sourceMappingURL=toggle.bundle.js.map