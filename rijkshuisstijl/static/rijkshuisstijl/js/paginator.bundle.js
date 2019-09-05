(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["paginator"],{

/***/ "./rijkshuisstijl/js/components/paginator/paginator.js":
/*!*************************************************************!*\
  !*** ./rijkshuisstijl/js/components/paginator/paginator.js ***!
  \*************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bem.js */ "./node_modules/bem.js/dist/bem.js");
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bem_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! urijs */ "./node_modules/urijs/src/URI.js");
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/paginator/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/**
 * Contains logic for making the paginator work with existing GET params.
 * @class
 */var Paginator=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLFormElement} node
     */function Paginator(node){_classCallCheck(this,Paginator);/** @type {HTMLFormElement} */this.node=node;/** @type {HTMLInputElement} */this.input=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(this.node,_constants__WEBPACK_IMPORTED_MODULE_2__["BLOCK_INPUT"]);this.bindEvents();}/**
     * Binds events to callbacks.
     */_createClass(Paginator,[{key:"bindEvents",value:function bindEvents(){this.node.addEventListener('submit',this.onChange.bind(this));this.node.addEventListener('change',this.onChange.bind(this));this.node.addEventListener('click',this.onClick.bind(this));}/**
     * Callback for change event on this.node.
     * @param {Event} e
     */},{key:"onChange",value:function onChange(e){e.preventDefault();this.navigate();}/**
     * Callback for click event on this.node.
     * @param {Event} e
     */},{key:"onClick",value:function onClick(e){e.preventDefault();if(e.target.dataset.page){this.navigate(e.target.dataset.page);}}/**
     * Navigate to the page specified in this.input.
     */},{key:"navigate",value:function navigate(){var page=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.input.value;window.location=urijs__WEBPACK_IMPORTED_MODULE_1___default()(window.location).setSearch(this.input.name,page);}}]);return Paginator;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_2__["PAGINATORS"]).forEach(function(node){return new Paginator(node);});

/***/ })

}]);