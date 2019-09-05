(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["toggle"],{

/***/ "./rijkshuisstijl/js/components/toggle/toggle.js":
/*!*******************************************************!*\
  !*** ./rijkshuisstijl/js/components/toggle/toggle.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bem.js */ "./node_modules/bem.js/dist/bem.js");
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bem_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/toggle/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/**
 * Class for generic toggles.
 *
 * Toggle should have BLOCK_TOGGLE present in classList for detection.
 * Toggle should have data-toggle-target set to query selector for target.
 * Toggle should have data-toggle-modifier set to modifier to toggle.
 * Toggle may have data-focus-target set to query selector for node to focus on click.
 * Toggle may have data-link-mode set to either "normal", "positive", "negative" or "prevent", see this.onClick().
 * @class
 */var Toggle=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLElement} node
     */function Toggle(node){_classCallCheck(this,Toggle);/** @type {HTMLElement} */this.node=node;/** @type {string} */this.toggleModifier=this.node.dataset.toggleModifier;/** @type {(boolean|undefined)} */this.toggleMobileState=this.node.dataset.toggleMobileState?this.node.dataset.toggleMobileState.toUpperCase()==='TRUE':undefined;this.restoreState();this.bindEvents();}/**
     * Binds events to callbacks.
     */_createClass(Toggle,[{key:"bindEvents",value:function bindEvents(){this.node.addEventListener('click',this.onClick.bind(this));}/**
     * Callback for this.node click.
     *
     * Prevents default action (e.preventDefault()) based on target and this.node.dataset.toggleLinkMode value:
     * - "normal": (default) Prevent default on regular elements and links towards "#", pass all other links.
     * - "positive": Prevent default on regular elements, dont prevent links if this.getState() returns true.
     * - "negative": Prevent default on regular elements, dont prevent links if this.getState() returns false.
     * - "prevent": Always prevent default.
     *
     * @param {MouseEvent} e
     */},{key:"onClick",value:function onClick(e){var _this=this;var toggleLinkMode=this.node.dataset.toggleLinkMode||'normal';if(toggleLinkMode==='normal'){if(!e.target.href||e.target.href==='#'){e.preventDefault();}}else if(toggleLinkMode==='positive'){if(!e.target.href||!this.getState()){e.preventDefault();}}else if(toggleLinkMode==='negative'){if(!e.target.href||this.getState()){e.preventDefault();}}else if(toggleLinkMode==='prevent'){e.preventDefault();}setTimeout(function(){_this.toggle();_this.saveState();_this.focus();},100);}/**
     * Focuses this.node.dataset.focusTarget.
     */},{key:"focus",value:function focus(){var querySelector=this.node.dataset.focusTarget;if(querySelector&&this.getState()){var target=document.querySelector(querySelector);target.focus();}}/**
     * Performs toggle.
     * @param {boolean} [exp] If passed, add/removes this.toggleModifier based on exp.
     */},{key:"toggle",value:function toggle(){var _this2=this;var exp=arguments.length>0&&arguments[0]!==undefined?arguments[0]:undefined;var targets=this.getTargets();targets.forEach(function(target){return bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.toggleModifier(target,_this2.toggleModifier,exp);});this.getExclusive().filter(function(exclusive){return targets.indexOf(exclusive)===-1;}).forEach(function(exclusive){return bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.removeModifier(exclusive,_this2.toggleModifier);});}/**
     * Returns the toggle state (whether this.node.toggleModifier is applied).
     * State is retrieved from first target.
     * @returns {(boolean|null)} Boolean is target is found and state is retrieved, null if no target has been found.
     */},{key:"getState",value:function getState(){var referenceTarget=this.getTargets()[0];if(!referenceTarget){return null;}return Boolean(bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.hasModifier(referenceTarget,this.toggleModifier));}/**
     * Returns all the targets for this.node.
     * @returns {*}
     */},{key:"getTargets",value:function getTargets(){var selector=this.node.dataset.toggleTarget;return this.getRelated(selector);}/**
     * Returns all the grouped "exclusive" toggles of this.node.
     * @returns {*}
     */},{key:"getExclusive",value:function getExclusive(){var selector=this.node.dataset.toggleExclusive||'';return this.getRelated(selector);}/**
     * Splits selector by "," and query selects each part.
     * @param {string} selector Selector(s) (optionally divided by ",").
     * @return {Array} An array of all matched nodes.
     */},{key:"getRelated",value:function getRelated(selector){var targets=[];selector.split(',').filter(function(selector){return selector.length;}).forEach(function(selector){return targets=[].concat(_toConsumableArray(targets),_toConsumableArray(document.querySelectorAll(selector)));});return targets;}/**
     * Saves state to localstorage.
     */},{key:"saveState",value:function saveState(){var id=this.node.id;var value=this.getState();if(typeof value!=='boolean'){return;}if(id){var key="ToggleButton#".concat(id,".modifierApplied");try{localStorage.setItem(key,value);}catch(e){console.warn(this,'Unable to save state to localstorage');}}}/**
     * Restores state from localstorage.
     */},{key:"restoreState",value:function restoreState(){if(this.toggleMobileState!==undefined&&matchMedia('(max-width: 767px)').matches){this.toggle(this.toggleMobileState);return;}var id=this.node.id;if(id){var key="ToggleButton#".concat(id,".modifierApplied");try{var value=localStorage.getItem(key)||false;this.toggle(value.toUpperCase()==='TRUE');}catch(e){}}}}]);return Toggle;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_1__["TOGGLES"]).forEach(function(node){return new Toggle(node);});

/***/ })

}]);