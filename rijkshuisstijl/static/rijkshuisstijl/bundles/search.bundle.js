(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["search"],{

/***/ "./rijkshuisstijl/js/components/button/constants.js":
/*!**********************************************************!*\
  !*** ./rijkshuisstijl/js/components/button/constants.js ***!
  \**********************************************************/
/*! exports provided: BLOCK_BUTTON, MODIFIER_PRIMARY, MODIFIER_SECONDARY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLOCK_BUTTON", function() { return BLOCK_BUTTON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODIFIER_PRIMARY", function() { return MODIFIER_PRIMARY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODIFIER_SECONDARY", function() { return MODIFIER_SECONDARY; });
/** @const {string} */var BLOCK_BUTTON='button';/** @const {string} Modifier indicating a primary button. */var MODIFIER_PRIMARY='primary';/** @const {string} Modifier indicating a secondary button. */var MODIFIER_SECONDARY='secondary';

/***/ }),

/***/ "./rijkshuisstijl/js/components/search/search.js":
/*!*******************************************************!*\
  !*** ./rijkshuisstijl/js/components/search/search.js ***!
  \*******************************************************/
/*! exports provided: Search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Search", function() { return Search; });
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bem.js */ "./node_modules/bem.js/dist/bem.js");
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bem_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _button_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../button/constants */ "./rijkshuisstijl/js/components/button/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/search/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/**
 * Contains additional logic controlling search widget.
 * NOTE: Open/close behaviour controlled by button (ToggleButton).
 * @class
 */var Search=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLFormElement} node
     */function Search(node){_classCallCheck(this,Search);/** @type {HTMLFormElement} */this.node=node;/** @type {HTMLInputElement} */this.input=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(this.node,_constants__WEBPACK_IMPORTED_MODULE_2__["BLOCK_SEARCH"],_constants__WEBPACK_IMPORTED_MODULE_2__["ELEMENT_INPUT"]);/** @type {HTMLButtonElement} */this.buttonPrimary=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(this.node,_button_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_BUTTON"],false,_button_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_PRIMARY"]);/** @type {HTMLButtonElement} */this.buttonSecondary=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(this.node,_button_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_BUTTON"],false,_button_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_SECONDARY"]);this.bindEvents();}/**
     * Binds events to callbacks.
     */_createClass(Search,[{key:"bindEvents",value:function bindEvents(){this.buttonPrimary.addEventListener('click',this.onClickButtonPrimary.bind(this));this.buttonSecondary.addEventListener('click',this.onClickButtonSecondary.bind(this));this.input.addEventListener('blur',this.onBlur.bind(this));this.input.addEventListener('keypress',this.onPressEnter.bind(this));}/**
     * Callback for keypress event on focused input.
     * Submits for if the user pressed enter and there is an input value.
     */},{key:"onPressEnter",value:function onPressEnter(e){var keyCode=e.keyCode;if(keyCode===13){e.preventDefault();if(this.input.value){this.input.form.submit();}}}/**
     * Callback for click event on this.buttonPrimary.
     * Submits form if input has value.
     * Focuses this.input if MODIFIER_OPEN is set on this.node.
     * Blurs this.input otherwise.
     */},{key:"onClickButtonPrimary",value:function onClickButtonPrimary(){if(bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.hasModifier(this.node,_constants__WEBPACK_IMPORTED_MODULE_2__["MODIFIER_OPEN"])){if(this.input.value){this.input.form.submit();}this.input.focus();}else{this.input.blur();}}/**
     * Callback for click event on this.buttonSecondary.
     * Clears/focuses this.input.
     * @param {Event} e
     */},{key:"onClickButtonSecondary",value:function onClickButtonSecondary(e){e.preventDefault();this.input.value='';this.input.focus();}/**
     * Callback for blur event on this.input.
     * Calls this.close() if input does not have value.
     * @param {Event} e
     */},{key:"onBlur",value:function onBlur(e){if(!this.input.value&&!e.relatedTarget){this.close();}}/**
     * Additional control for removing MODIFIER_OPEN for this.node.
     * NOTE: Open/close behaviour controlled by button (ToggleButton).
     */},{key:"close",value:function close(){bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.removeModifier(this.node,_constants__WEBPACK_IMPORTED_MODULE_2__["MODIFIER_OPEN"]);}}]);return Search;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_2__["SEARCHES"]).forEach(function(search){return new Search(search);});

/***/ })

}]);
//# sourceMappingURL=search.bundle.js.map