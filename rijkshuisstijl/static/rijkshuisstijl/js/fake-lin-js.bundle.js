(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["fake-lin-js"],{

/***/ "./rijkshuisstijl/js/components/fake-link/fake-link.js":
/*!*************************************************************!*\
  !*** ./rijkshuisstijl/js/components/fake-link/fake-link.js ***!
  \*************************************************************/
/*! exports provided: FakeLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeLink", function() { return FakeLink; });
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bem.js */ "./node_modules/bem.js/dist/bem.js");
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bem_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/fake-link/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/**
 * Class for fake (simulated) links.
 *
 * Toggle should have BLOCK_FAKE_LINK present in classList for detection.
 * Toggle should have data-href set to target location.
 * @class
 */var FakeLink=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLElement} node
     */function FakeLink(node){_classCallCheck(this,FakeLink);/** @type {HTMLElement} */this.node=node;/** @type {string} */this.href=this.node.dataset.href;this.bindEvents();}/**
     * Binds events to callbacks.
     */_createClass(FakeLink,[{key:"bindEvents",value:function bindEvents(){if(bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.hasModifier(this.node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_DOUBLE_CLICK"])){this.node.addEventListener('dblclick',this.navigate.bind(this));}else{this.node.addEventListener('click',this.navigate.bind(this));}}/**
     * Navigates to this.href.
     */},{key:"navigate",value:function navigate(){window.location=this.href;}}]);return FakeLink;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_1__["FAKE_LINKS"]).forEach(function(node){return new FakeLink(node);});

/***/ })

}]);