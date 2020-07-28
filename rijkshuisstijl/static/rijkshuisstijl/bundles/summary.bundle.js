(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["summary"],{

/***/ "./rijkshuisstijl/js/components/summary/summary.js":
/*!*********************************************************!*\
  !*** ./rijkshuisstijl/js/components/summary/summary.js ***!
  \*********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bem.js */ "./node_modules/bem.js/dist/bem.js");
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bem_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/summary/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/** @const {number} getKeyValue() while loop limit. */var MAX_ITERATION_COUNT=10;/**
 * Controls auto toggle inputs if not valid.
 * @class
 */var SummaryEdit=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLElement} node
     */function SummaryEdit(node){_classCallCheck(this,SummaryEdit);/** @type {HTMLElement} */this.node=node;/** @type {NodeList} Children of node that can be validated. */this.validatables=this.node.querySelectorAll(':invalid, :valid');this.bindEvents();}/**
     * Binds events to callbacks.
     */_createClass(SummaryEdit,[{key:"bindEvents",value:function bindEvents(){var _this=this;_toConsumableArray(this.validatables).forEach(function(node){return node.addEventListener('invalid',_this.update.bind(_this,node));});}/**
     * Finds the key value element associated with node.
     * @param {HTMLElement} node
     * @return {HTMLElement}
     */},{key:"getKeyValue",value:function getKeyValue(node){var i=0;var className=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getBEMClassName(_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_SUMMARY"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_KEY_VALUE"]);while(!node.classList.contains(className)){i++;node=node.parentNode;if(i>MAX_ITERATION_COUNT){throw"MAX_ITERATION_COUNT (".concat(MAX_ITERATION_COUNT,") reached while trying to find key value element.");}}return node;}/**
     * Makes sure node is visible if not valid.
     * @param {HTMLElement} node
     */},{key:"update",value:function update(node){var toggle=this.getKeyValue(node);bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.addModifier(toggle,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_EDIT"]);node.focus();node.scrollIntoView();}}]);return SummaryEdit;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_1__["SUMMARIES"]).forEach(function(node){return new SummaryEdit(node);});

/***/ })

}]);
//# sourceMappingURL=summary.bundle.js.map