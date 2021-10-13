(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["datagrid-filter"],{

/***/ "./rijkshuisstijl/js/components/datagrid/datagrid-filter.js":
/*!******************************************************************!*\
  !*** ./rijkshuisstijl/js/components/datagrid/datagrid-filter.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bem.js */ "./node_modules/bem.js/dist/bem.js");
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bem_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/datagrid/constants.js");
/* harmony import */ var _form_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../form/constants */ "./rijkshuisstijl/js/components/form/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/**
 * Polyfills form association from datagrid filter.
 */var DataGridFilter=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLElement} node
     */function DataGridFilter(node){_classCallCheck(this,DataGridFilter);/** @type {HTMLElement} */this.node=node;/** @type {(HTMLFormElement|null)} */this.form=this.getForm();/** @type {(HTMLInputElement|HTMLSelectElement|null)} */this.input=this.getInput();this.bindEvents();}/**
     * Binds events to callbacks.
     */_createClass(DataGridFilter,[{key:"bindEvents",value:function bindEvents(){if(this.input){this.input.addEventListener('change',this.onSubmit.bind(this));}}/**
     * Finds the form associated with the filter.
     * @return {(HTMLFormElement|null)}
     */},{key:"getForm",value:function getForm(){var input=this.getInput();if(input){if(!input.form){var formId=input.getAttribute('form');return document.getElementById(formId);}return input.form;}}/**
     * Finds the first input or select as child of this.node.
     * @return {(HTMLInputElement|HTMLSelectElement|null)}
     */},{key:"getInput",value:function getInput(){var input=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(this.node,_form_constants__WEBPACK_IMPORTED_MODULE_2__["BLOCK_INPUT"]);var select=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(this.node,_form_constants__WEBPACK_IMPORTED_MODULE_2__["BLOCK_SELECT"]);return input||select;}/**
     * Appends clone of inputs pointing to this.form before submitting it when browser does not support input form
     * attribute.
     */},{key:"onSubmit",value:function onSubmit(){var _this=this;var formId=this.form.id;var inputs=document.querySelectorAll("[form=\"".concat(formId,"\"]"));_toConsumableArray(inputs).forEach(function(node){var newNode=document.createElement('input');if(node.form){// Browser supports input form attribute.
return;}newNode.name=node.name;newNode.type='hidden';newNode.value=node.value;_this.form.appendChild(newNode);});this.form.submit();}}]);return DataGridFilter;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_1__["DATAGRID_FILTERS"]).forEach(function(node){return new DataGridFilter(node);});

/***/ })

}]);