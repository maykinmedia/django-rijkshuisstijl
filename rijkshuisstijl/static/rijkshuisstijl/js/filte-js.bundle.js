(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["filte-js"],{

/***/ "./rijkshuisstijl/js/components/filter/filter.js":
/*!*******************************************************!*\
  !*** ./rijkshuisstijl/js/components/filter/filter.js ***!
  \*******************************************************/
/*! exports provided: Filter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bem.js */ "./node_modules/bem.js/dist/bem.js");
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bem_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/filter/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/**
 * Class for generic filters.
 * Filter should have MODIFIER_FILTER present in classList for detection.
 * Filter should have data-filter-target set to query selector for targets.
 * @class
 */var Filter=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLElement} node
     */function Filter(node){_classCallCheck(this,Filter);/** @type {HTMLElement} */this.node=node;/** @type {HTMLInputElement} */this.input=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(this.node,_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_FILTER"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_INPUT"]);this.bindEvents();this.applyFilter();}/**
     * Binds events to callbacks.
     */_createClass(Filter,[{key:"bindEvents",value:function bindEvents(){this.node.addEventListener('input',this.filter.bind(this));}/**
     * Applies/discard the filter based on this.input.value.
     */},{key:"filter",value:function filter(){if(this.input.value){this.applyFilter();}else{this.discardFilter();}}/**
     * Hides all the nodes matching query selector set in data-filter-target that don't match this.input.value.
     */},{key:"applyFilter",value:function applyFilter(){var _this=this;setTimeout(function(){var selection=document.querySelectorAll(_this.node.dataset.filterTarget);var query=_this.input.value.toUpperCase();_toConsumableArray(selection).forEach(function(node){bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.addModifier(node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_MATCH"]);bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.removeModifier(node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_NO_MATCH"]);if(!bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.hasModifier(_this.node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_CLASS_ONLY"])){node.style.removeProperty('display');}if(!node.textContent.toUpperCase().match(query)){bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.removeModifier(node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_MATCH"]);bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.addModifier(node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_NO_MATCH"]);if(!bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.hasModifier(_this.node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_CLASS_ONLY"])){node.style.display='none';}}});});}/**
     * Removes display property from inline style of every node matching query selector set in data-filter-target.
     */},{key:"discardFilter",value:function discardFilter(){var _this2=this;var selection=document.querySelectorAll(this.node.dataset.filterTarget);_toConsumableArray(selection).forEach(function(node){if(!bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.hasModifier(_this2.node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_CLASS_ONLY"])){node.style.removeProperty('display');}bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.removeModifier(node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_NO_MATCH"]);bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.addModifier(node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_MATCH"]);});}}]);return Filter;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_1__["FILTERS"]).forEach(function(filter){return new Filter(filter);});

/***/ })

}]);