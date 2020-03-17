(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tabs"],{

/***/ "./rijkshuisstijl/js/components/tabs/tabs.js":
/*!***************************************************!*\
  !*** ./rijkshuisstijl/js/components/tabs/tabs.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bem.js */ "./node_modules/bem.js/dist/bem.js");
/* harmony import */ var bem_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bem_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./rijkshuisstijl/js/components/tabs/constants.js");
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/**
 * Contains logic for tabs.
 * @class
 */var Tabs=/*#__PURE__*/function(){/**
     * Constructor method.
     * @param {HTMLElement} node
     */function Tabs(node){_classCallCheck(this,Tabs);/** @type {HTMLElement} */this.node=node;/** @type {NodeList} */this.listItems=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNodes(this.node,_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_TABS"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_LIST_ITEM"]);/** @type {NodeList} */this.links=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNodes(this.node,_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_TABS"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_LINK"]);/** @type {NodeList} */this.track=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNode(this.node,_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_TABS"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_TRACK"]);/** @type {NodeList} */this.tabs=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getChildBEMNodes(this.node,_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_TABS"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_TAB"]);this.bindEvents();if(!this.activateHashLinkTab()){this.activateCurrentTab();}}/**
     * Binds events to callbacks.
     */_createClass(Tabs,[{key:"bindEvents",value:function bindEvents(){var _this=this;_toConsumableArray(this.links).forEach(function(link){return _this.bindLink(link);});window.addEventListener('popstate',this.activateHashLinkTab.bind(this));window.addEventListener('resize',this.activateCurrentTab.bind(this));}/**
     * Binds link click to callback.
     * @param {HTMLAnchorElement} link
     */},{key:"bindLink",value:function bindLink(link){link.addEventListener('click',this.onClick.bind(this));}/**
     * (Re)activates the active tab, or the first tab.
     */},{key:"activateCurrentTab",value:function activateCurrentTab(){var id=this.getActiveTabId();if(id){this.activateTab(id);}}/**
     * (Re)activates the active tab, or the first tab.
     */},{key:"activateHashLinkTab",value:function activateHashLinkTab(){var id=window.location.hash.replace('#','');var node=document.getElementById(id);if(node&&node.classList.contains(bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getBEMClassName(_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_TABS"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_TAB"]))){var listener=function listener(){window.scrollTo(0,0);window.removeEventListener('scroll',listener);};window.addEventListener('scroll',listener);this.activateTab(id);return true;}}/**
     * Returns the active tab id (this.node.dataset.tabId) or the first tab's id.
     * @returns {(string|void)}
     */},{key:"getActiveTabId",value:function getActiveTabId(){var tabId=this.node.dataset.tabId;if(tabId){return tabId;}else{try{return this.tabs[0].id;}catch(e){}}}/**
     * Handles link click event.
     * @param {MouseEvent} e
     */},{key:"onClick",value:function onClick(e){e.preventDefault();var link=e.target;var id=link.attributes.href.value.replace('#','');history.pushState({},document.title,link);this.activateTab(id);}/**
     * Activates tab with id.
     * @param {string} id The id of the tab.
     * @return {HTMLElement}
     */},{key:"activateTab",value:function activateTab(id){var link=_toConsumableArray(this.links).find(function(link){return link.attributes.href.value==='#'+id;});var listItem=this.getListItemByLink(link);var tabIndex=_toConsumableArray(this.tabs).findIndex(function(tab){return tab.id===id;});var tab=this.tabs[tabIndex];[].concat(_toConsumableArray(this.listItems),_toConsumableArray(this.tabs)).forEach(function(node){return bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.removeModifier(node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_ACTIVE"]);});[listItem,tab].forEach(function(node){return bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.addModifier(node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_ACTIVE"]);});this.node.dataset.tabId=id;}/**
     * Finds the list item containing link up the DOM tree.
     * @param {HTMLAnchorElement} link
     */},{key:"getListItemByLink",value:function getListItemByLink(link){var listItemClassName=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getBEMClassName(_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_TABS"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_LIST_ITEM"]);var i=0;while(!link.classList.contains(listItemClassName)){link=link.parentElement;if(i>100){console.error('Failed to find list item');break;}}return link;}}]);return Tabs;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_1__["TABS"]).forEach(function(tabs){return new Tabs(tabs);});

/***/ })

}]);