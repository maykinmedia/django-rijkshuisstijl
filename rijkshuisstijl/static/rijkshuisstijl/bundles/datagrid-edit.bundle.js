(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["datagrid-edit"],{

/***/ "./rijkshuisstijl/js/components/datagrid/datagrid-edit.js":
/*!****************************************************************!*\
  !*** ./rijkshuisstijl/js/components/datagrid/datagrid-edit.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bem.js */ "./node_modules/bem.js/dist/bem.js");
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bem_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/datagrid/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var DataGridEdit=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLElement} node
     */function DataGridEdit(node){_classCallCheck(this,DataGridEdit);/** @type {HTMLElement} */this.node=node;this.bindEvents();}/**
     * Binds events to callbacks.
     */_createClass(DataGridEdit,[{key:"bindEvents",value:function bindEvents(){this.node.addEventListener('rh-toggle',this.update.bind(this));}/**
     * Toggle MODIFIER_EDIT on this.node based on presense of datagrid__row--edit matches.
     */},{key:"update",value:function update(){var editable_row=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNodes(this.node,_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_DATAGRID"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_ROW"],_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_EDIT"]);var exp=Boolean(editable_row.length);bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.toggleModifier(this.node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_EDIT"],exp);}}]);return DataGridEdit;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_1__["DATAGRIDS"]).forEach(function(node){return new DataGridEdit(node);});

/***/ })

}]);
//# sourceMappingURL=datagrid-edit.bundle.js.map