(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["input-filepicker"],{

/***/ "./rijkshuisstijl/js/components/form/input-filepicker.js":
/*!***************************************************************!*\
  !*** ./rijkshuisstijl/js/components/form/input-filepicker.js ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/form/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/**
 * Updates label on input file picker.
 * @class
 */var InputFilePicker=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLLabelElement} node
     */function InputFilePicker(node){_classCallCheck(this,InputFilePicker);/** @type {HTMLLabelElement} */this.node=node;/** @type {HTMLInputElement} */this.input=this.node.previousElementSibling;this.bindEvents();}/**
     * Returns the name of the selected file or an empty string.
     * @return {string}
     */_createClass(InputFilePicker,[{key:"getFileName",value:function getFileName(){if(this.input.files.length){return this.input.files[0].name;}return'';}/**
     * Binds events to callbacks.
     */},{key:"bindEvents",value:function bindEvents(){this.input.addEventListener('change',this.update.bind(this));}/**
     * Updates the textcontent of the input file picker with the input's selected file name.
     */},{key:"update",value:function update(){this.node.textContent=this.getFileName();}}]);return InputFilePicker;}();// START!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_0__["INPUT_FILEPICKERS"]).forEach(function(node){return new InputFilePicker(node);});

/***/ })

}]);