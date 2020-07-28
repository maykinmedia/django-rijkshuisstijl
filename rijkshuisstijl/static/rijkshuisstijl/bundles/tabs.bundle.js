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
function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest();}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr,i){if(typeof Symbol==="undefined"||!(Symbol.iterator in Object(arr)))return;var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread();}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(iter))return Array.from(iter);}function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}/**
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
     */},{key:"activateTab",value:function activateTab(id){var link=_toConsumableArray(this.links).find(function(link){return link.attributes.href.value==='#'+id;});var listItem=this.getListItemByLink(link);var tabIndex=_toConsumableArray(this.tabs).findIndex(function(tab){return tab.id===id;});var tab=this.tabs[tabIndex];[].concat(_toConsumableArray(this.listItems),_toConsumableArray(this.tabs)).forEach(function(node){return bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.removeModifier(node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_ACTIVE"]);});[listItem,tab].forEach(function(node){return bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.addModifier(node,_constants__WEBPACK_IMPORTED_MODULE_1__["MODIFIER_ACTIVE"]);});this.node.dataset.tabId=id;// Support leaflet.
//
// Leaflet won't render correctly if not visible. Therefore, we need to invalidate it's size to re-render it.
// We don't have a direct reference to the leaflet instances so we try to find the callbacks in
// window._leaflet_events, then call it when activating the tab (if the even name matches resize).
//
// FIXME: There is probably a better way to do this.
try{Object.entries(window._leaflet_events).forEach(function(_ref){var _ref2=_slicedToArray(_ref,2),event_name=_ref2[0],callback=_ref2[1];if(event_name.indexOf('resize')>-1){callback();}});}catch(e){}}/**
     * Finds the list item containing link up the DOM tree.
     * @param {HTMLAnchorElement} link
     */},{key:"getListItemByLink",value:function getListItemByLink(link){var listItemClassName=bem_js__WEBPACK_IMPORTED_MODULE_0___default.a.getBEMClassName(_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_TABS"],_constants__WEBPACK_IMPORTED_MODULE_1__["ELEMENT_LIST_ITEM"]);var i=0;while(!link.classList.contains(listItemClassName)){link=link.parentElement;if(i>100){console.error('Failed to find list item');break;}}return link;}}]);return Tabs;}();// Start!
_toConsumableArray(_constants__WEBPACK_IMPORTED_MODULE_1__["TABS"]).forEach(function(tabs){return new Tabs(tabs);});

/***/ })

}]);
//# sourceMappingURL=tabs.bundle.js.map