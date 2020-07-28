(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["select-all"],{

/***/ "./rijkshuisstijl/js/components/toggle/select-all.js":
/*!***********************************************************!*\
  !*** ./rijkshuisstijl/js/components/toggle/select-all.js ***!
  \***********************************************************/
/*! exports provided: SelectAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectAll", function() { return SelectAll; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/toggle/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/**
 * Class for generic select all checkboxes.
 * Toggle should have BLOCK_SELECT_ALL present in classList for detection.
 * Toggle should have data-select-all set to queryselector for target(s).
 * @class
 */var SelectAll=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLInputElement} node
     */function SelectAll(node){_classCallCheck(this,SelectAll);/** @type {HTMLInputElement} */this.node=node;this.bindEvents();}/**
     * Binds events to callbacks.
     */_createClass(SelectAll,[{key:"bindEvents",value:function bindEvents(){this.node.addEventListener('click',this.onClick.bind(this));}/**
     * Callback for this.node click.
     * @param {Event} e
     */},{key:"onClick",value:function onClick(e){e.stopPropagation();e.preventDefault();setTimeout(this.toggle.bind(this));}/**
     * Performs toggle.
     * @param {boolean} [exp] If passed, add/removes this.toggleModifier based on exp.
     */},{key:"toggle",value:function toggle(){var exp=arguments.length>0&&arguments[0]!==undefined?arguments[0]:!this.getState();this.getTargets().forEach(function(target){var event=document.createEvent('Event');event.initEvent('change',true,true);setTimeout(function(){return target.dispatchEvent(event);});target.checked=exp;});this.node.checked=exp;}/**
     * Returns the checkbox state.
     * @returns {boolean} Boolean
     */},{key:"getState",value:function getState(){return this.node.checked;}/**
     * Returns all the targets for this.node.
     * @returns {*}
     */},{key:"getTargets",value:function getTargets(){var targets=[];var selector=this.node.dataset.selectAll;selector.split(',').filter(function(selector){return selector.length;}).forEach(function(selector){return targets=[].concat(_toConsumableArray(targets),_toConsumableArray(document.querySelectorAll(selector)));});return targets;}}]);return SelectAll;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_0__["SELECT_ALLS"]).forEach(function(node){return new SelectAll(node);});

/***/ })

}]);
//# sourceMappingURL=select-all.bundle.js.map