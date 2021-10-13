(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["datagrid-export"],{

/***/ "./rijkshuisstijl/js/components/datagrid/datagrid-export.js":
/*!******************************************************************!*\
  !*** ./rijkshuisstijl/js/components/datagrid/datagrid-export.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bem.js */ "./node_modules/bem.js/dist/bem.js");
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bem_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/datagrid/constants.js");
/* harmony import */ var _form_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../form/constants */ "./rijkshuisstijl/js/components/form/constants.js");
/* harmony import */ var _toggle_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toggle/constants */ "./rijkshuisstijl/js/components/toggle/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var MAX_ITERATION_COUNT=100;/**
 * Makes sure data grid export buttons default to current page selection.
 */var DataGridExportHelper=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLElement} node
     */function DataGridExportHelper(node){_classCallCheck(this,DataGridExportHelper);/** @type {HTMLElement} */this.node=node;this.bindEvents();}/**
     * Binds events to callbacks.
     */_createClass(DataGridExportHelper,[{key:"bindEvents",value:function bindEvents(){this.node.addEventListener('click',this.update.bind(this));}},{key:"getDataGrid",value:function getDataGrid(){var node=this.node;var i=0;while(!node.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_DATAGRID"])){i++;node=node.parentNode;if(i>MAX_ITERATION_COUNT){throw"MAX_ITERATION_COUNT (".concat(MAX_ITERATION_COUNT,") reached while trying to find data grid element.");}}return node;}/**
     * Checks all checkboxes in the data grid if none has been checked.
     * @param {MouseEvent} e
     */},{key:"update",value:function update(e){var dataGrid=this.getDataGrid();var checkboxCells=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNodes(dataGrid,_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_DATAGRID"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_CELL"],_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_CHECKBOX"]);var checkboxesInputs=_toConsumableArray(checkboxCells).map(function(node){return bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(node,_form_constants__WEBPACK_IMPORTED_MODULE_2__["BLOCK_INPUT"]);});var selectedCheckboxInputs=checkboxesInputs.find(function(node){return node.checked;});// Only check checkboxes if none hase been already checked.
if(!selectedCheckboxInputs){e.preventDefault();var form=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(dataGrid,_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_DATAGRID"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_FORM"],_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_ACTION"]);var selectAll=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(dataGrid,_toggle_constants__WEBPACK_IMPORTED_MODULE_3__["BLOCK_SELECT_ALL"]);// Select all checkboxes, including the "select all" toggle.
selectAll.checked=true;checkboxesInputs.forEach(function(node){node.checked=true;});var hiddenInput=document.createElement('input');hiddenInput.name=this.node.name;hiddenInput.value=this.node.value;hiddenInput.type='hidden';form.appendChild(hiddenInput);form.submit();}}}]);return DataGridExportHelper;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_1__["DATAGRID_EXPORTS"]).forEach(function(node){return new DataGridExportHelper(node);});

/***/ })

}]);