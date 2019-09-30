/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/rijkshuisstijl/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./rijkshuisstijl/js/compat.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/better-dateinput-polyfill/dist/better-dateinput-polyfill.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/better-dateinput-polyfill/dist/better-dateinput-polyfill.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * better-dateinput-polyfill: input[type=date] polyfill for better-dom
 * @version 3.2.7 Fri, 31 May 2019 21:09:24 GMT
 * @link https://github.com/chemerisuk/better-dateinput-polyfill
 * @copyright 2019 Maksim Chemerisuk
 * @license MIT
 */
(function () {
  "use strict";

  /* globals html:false */
  var MAIN_CSS = "dateinput-picker{display:inline-block;vertical-align:bottom}dateinput-picker>object{position:absolute;z-index:1000;width:21rem;height:20rem;max-height:20rem;box-shadow:0 8px 24px #888;background:#fff;opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transform-origin:0 0;transform-origin:0 0;transition:.1s ease-out}dateinput-picker[aria-hidden=true]>object{opacity:0;-webkit-transform:skew(-25deg) scaleX(.75);transform:skew(-25deg) scaleX(.75);visibility:hidden;height:0}dateinput-picker[aria-expanded=true]>object{height:13.75rem;max-height:13.75rem}dateinput-picker+input{color:transparent!important;caret-color:transparent!important}dateinput-picker+input::selection{background:none}dateinput-picker+input::-moz-selection{background:none}";
  var HTML = DOM.find("html");
  var DEFAULT_LANGUAGE = HTML.get("lang") || void 0;
  var DEVICE_TYPE = "orientation" in window ? "mobile" : "desktop";

  var TYPE_SUPPORTED = function () {
    // use a stronger type support detection that handles old WebKit browsers:
    // http://www.quirksmode.org/blog/archives/2015/03/better_modern_i.html
    return DOM.create("<input type='date'>").value("_").value() !== "_";
  }();

  function formatLocalDate(date) {
    return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-");
  }

  function parseLocalDate(value) {
    // datetime value parsed with local timezone
    var dateValue = new Date((value || "?") + "T00:00");
    return isNaN(dateValue.getTime()) ? null : dateValue;
  }

  var globalFormatters = DOM.findAll("meta[name^='data-format:']").reduce(function (globalFormatters, meta) {
    var key = meta.get("name").split(":")[1].trim();
    var formatOptions = JSON.parse(meta.get("content"));

    if (key) {
      try {
        globalFormatters[key] = new window.Intl.DateTimeFormat(DEFAULT_LANGUAGE, formatOptions);
      } catch (err) {}
    }

    return globalFormatters;
  }, {});
  DOM.extend("input[type=date]", {
    constructor: function constructor() {
      if (this._isPolyfillEnabled()) return false;
      var svgTextOptions = this.css(["color", "font-size", "font-family", "font-style", "line-height", "padding-left", "border-left-width", "text-indent"]);
      svgTextOptions.dx = ["padding-left", "border-left-width", "text-indent"].map(function (p) {
        return parseFloat(svgTextOptions[p]);
      }).reduce(function (a, b) {
        return a + b;
      });
      svgTextOptions.css = ["font-family", "font-style", "line-height", "font-size"].map(function (p) {
        return p + ":" + svgTextOptions[p];
      }).join(";").replace(/"/g, ""); // FIXME: fix issue in html helper and drop replace below

      this._backgroundTemplate = ("<svg xmlns=\"http://www.w3.org/2000/svg\"><text x=\"" + svgTextOptions.dx + "\" y=\"50%\" dy=\".35em\" fill=\"" + svgTextOptions.color + "\"></text></svg>").replace("></", " style=\"" + svgTextOptions.css + "\"></");
      var picker = DOM.create("<dateinput-picker tabindex='-1'>"); // store reference to the input

      picker._parentInput = this; // add <dateinput-picker> to the document

      this.before(picker.hide()); // store reference to the picker

      this._picker = picker;

      var resetDisplayedText = this._syncDisplayedText.bind(this, "defaultValue");

      var updateDisplayedText = this._syncDisplayedText.bind(this, "value"); // patch value property for the input element


      var valueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
      Object.defineProperty(this[0], "value", {
        configurable: false,
        enumerable: true,
        get: valueDescriptor.get,
        set: this._setValue.bind(this, valueDescriptor.set, updateDisplayedText)
      });
      Object.defineProperty(this[0], "valueAsDate", {
        configurable: false,
        enumerable: true,
        get: this._getValueAsDate.bind(this),
        set: this._setValueAsDate.bind(this)
      }); // sync picker visibility on focus/blur

      this.on("change", updateDisplayedText);
      this.on("focus", this._focusInput.bind(this));
      this.on("blur", this._blurInput.bind(this));
      this.on("keydown", ["which"], this._keydownInput.bind(this));
      this.on("click", this._focusInput.bind(this)); // form events do not trigger any state change

      this.closest("form").on("reset", resetDisplayedText);
      resetDisplayedText(); // present initial value
    },
    _isPolyfillEnabled: function _isPolyfillEnabled() {
      var polyfillType = this.get("data-polyfill");
      if (polyfillType === "none") return true;

      if (polyfillType && (polyfillType === DEVICE_TYPE || polyfillType === "all")) {
        // remove native browser implementation
        this.set("type", "text"); // force applying the polyfill

        return false;
      }

      return TYPE_SUPPORTED;
    },
    _setValue: function _setValue(setter, updateDisplayedText, value) {
      var dateValue = parseLocalDate(value);

      if (!dateValue) {
        value = "";
      } else {
        var min = new Date((this.get("min") || "?") + "T00:00");
        var max = new Date((this.get("max") || "?") + "T00:00");

        if (dateValue < min) {
          value = formatLocalDate(min);
        } else if (dateValue > max) {
          value = formatLocalDate(max);
        }
      }

      setter.call(this[0], value);
      updateDisplayedText();
    },
    _getValueAsDate: function _getValueAsDate() {
      return parseLocalDate(this.value());
    },
    _setValueAsDate: function _setValueAsDate(dateValue) {
      if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
        this.value(formatLocalDate(dateValue));
      }
    },
    _syncDisplayedText: function _syncDisplayedText(propName) {
      var displayText = this.get(propName);
      var dateValue = parseLocalDate(displayText);

      if (dateValue) {
        var formatOptions = this.get("data-format");
        var formatter = globalFormatters[formatOptions];

        try {
          // set hours to '12' to fix Safari bug in Date#toLocaleString
          var presentedDate = new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate(), 12);

          if (formatter) {
            displayText = formatter.format(presentedDate);
          } else {
            displayText = presentedDate.toLocaleDateString(DEFAULT_LANGUAGE, formatOptions ? JSON.parse(formatOptions) : {});
          }
        } catch (err) {}
      }

      this.css("background-image", "url('data:image/svg+xml," + encodeURIComponent(this._backgroundTemplate.replace("></", ">" + displayText + "</")) + "')");
    },
    _keydownInput: function _keydownInput(which) {
      if (which === 13 && this._picker.get("aria-hidden") === "true") {
        // ENTER key should submit form if calendar is hidden
        return true;
      }

      if (which === 32) {
        // SPACE key toggles calendar visibility
        if (!this.get("readonly")) {
          this._picker.toggleState(false);

          this._picker.invalidateState();

          if (this._picker.get("aria-hidden") === "true") {
            this._picker.show();
          } else {
            this._picker.hide();
          }
        }
      } else if (which === 27 || which === 9 || which === 13) {
        this._picker.hide(); // ESC, TAB or ENTER keys hide calendar

      } else if (which === 8 || which === 46) {
        this.empty().fire("change"); // BACKSPACE, DELETE clear value
      } else if (which === 17) {
        // CONTROL toggles calendar mode
        this._picker.toggleState();

        this._picker.invalidateState();
      } else {
        var delta;

        if (which === 74 || which === 40) {
          delta = 7;
        } else if (which === 75 || which === 38) {
          delta = -7;
        } else if (which === 76 || which === 39) {
          delta = 1;
        } else if (which === 72 || which === 37) {
          delta = -1;
        }

        if (delta) {
          var currentDate = this.get("valueAsDate") || new Date();
          var expanded = this._picker.get("aria-expanded") === "true";

          if (expanded && (which === 40 || which === 38)) {
            currentDate.setMonth(currentDate.getMonth() + (delta > 0 ? 4 : -4));
          } else if (expanded && (which === 37 || which === 39)) {
            currentDate.setMonth(currentDate.getMonth() + (delta > 0 ? 1 : -1));
          } else {
            currentDate.setDate(currentDate.getDate() + delta);
          }

          this.value(formatLocalDate(currentDate)).fire("change");
        }
      } // prevent default action except if it was TAB so
      // do not allow to change the value manually


      return which === 9;
    },
    _blurInput: function _blurInput() {
      this._picker.hide();
    },
    _focusInput: function _focusInput() {
      if (this.get("readonly")) return false;
      var offset = this.offset();

      var pickerOffset = this._picker.offset();

      var marginTop = offset.height; // #3: move calendar to the top when passing cross browser window bounds

      if (HTML.get("clientHeight") < offset.bottom + pickerOffset.height) {
        marginTop = -pickerOffset.height;
      } // always reset picker mode to the default


      this._picker.toggleState(false);

      this._picker.invalidateState(); // always recalculate picker top position


      this._picker.css("margin-top", marginTop).show();
    }
  });
  DOM.importStyles(MAIN_CSS);
})();
(function () {
  "use strict";

  /* globals html:false */
  var PICKER_CSS = "body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:2.5rem;text-align:center;cursor:default;-webkit-user-select:none;-ms-user-select:none;user-select:none;margin:0;overflow:hidden}a{position:absolute;width:3rem;height:2.5rem}a[rel=prev]{left:0}a[rel=next]{right:0}b{display:block;cursor:pointer}table{width:100%;table-layout:fixed;border-spacing:0;border-collapse:collapse;text-align:center;line-height:2.5rem}table+table{line-height:3.75rem;background:#fff;position:absolute;top:2.5rem;left:0;opacity:1;transition:.1s ease-out}table+table[aria-hidden=true]{visibility:hidden!important;opacity:0}td,th{padding:0}thead{background:#ddd;font-size:smaller;font-weight:700}[aria-selected=false],[aria-disabled=true]{color:#888}[aria-selected=true]{box-shadow:inset 0 0 0 1px #888}a:hover,td:hover,[aria-disabled=true],[aria-selected=true]{background-color:#f5f5f5}";
  var HTML = DOM.find("html");
  var DEFAULT_LANGUAGE = HTML.get("lang") || void 0;
  var CLICK_EVENT_TYPE = "orientation" in window ? "touchend" : "mousedown";

  var INTL_SUPPORTED = function () {
    try {
      new Date().toLocaleString("_");
    } catch (err) {
      return err instanceof RangeError;
    }

    return false;
  }();

  function repeat(times, fn) {
    if (typeof fn === "string") {
      return Array(times + 1).join(fn);
    } else {
      return Array.apply(null, Array(times)).map(fn).join("");
    }
  }

  function ampm(pos, neg) {
    return DEFAULT_LANGUAGE === "en-US" ? pos : neg;
  }

  function localeWeekday(index) {
    var date = new Date();
    date.setDate(date.getDate() - date.getDay() + index + ampm(0, 1));
    /* istanbul ignore else */

    if (INTL_SUPPORTED) {
      try {
        return date.toLocaleDateString(DEFAULT_LANGUAGE, {
          weekday: "short"
        });
      } catch (err) {}
    }

    return date.toUTCString().split(",")[0].slice(0, 2);
  }

  function localeMonth(index) {
    var date = new Date(null, index);
    /* istanbul ignore else */

    if (INTL_SUPPORTED) {
      try {
        return date.toLocaleDateString(DEFAULT_LANGUAGE, {
          month: "short"
        });
      } catch (err) {}
    }

    return date.toUTCString().split(" ")[2];
  }

  function localeMonthYear(dateValue) {
    // set hours to '12' to fix Safari bug in Date#toLocaleString
    var date = new Date(dateValue.getFullYear(), dateValue.getMonth(), 12);
    /* istanbul ignore else */

    if (INTL_SUPPORTED) {
      try {
        return date.toLocaleDateString(DEFAULT_LANGUAGE, {
          month: "long",
          year: "numeric"
        });
      } catch (err) {}
    }

    return date.toUTCString().split(" ").slice(2, 4).join(" ");
  }

  var PICKER_BODY_HTML = "<a rel=\"prev\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"100%\" viewBox=\"0 0 16 16\"><path d=\"M11.5 14.06L1 8L11.5 1.94z\"/></svg></a><a rel=\"next\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"100%\" viewBox=\"0 0 16 16\"><path d=\"M15 8L4.5 14.06L4.5 1.94z\"/></svg></a><b></b><table><thead>" + repeat(7, function (_, i) {
    return "<th>" + localeWeekday(i);
  }) + "</thead><tbody>" + repeat(7, "<tr>" + repeat(7, "<td>") + "</tr>") + "</tbody></table><table><tbody>" + repeat(3, function (_, i) {
    return "<tr>" + repeat(4, function (_, j) {
      return "<td>" + localeMonth(i * 4 + j);
    });
  }) + "</tbody></table>";
  DOM.extend("dateinput-picker", {
    constructor: function constructor() {
      var IE = "ScriptEngineMajorVersion" in window;
      var object = DOM.create("<object type='text/html' width='100%' height='100%'>"); // non-IE: must be BEFORE the element added to the document

      if (!IE) {
        object.set("data", "about:blank");
      } // load content when <object> is ready


      this.on("load", {
        capture: true,
        once: true
      }, ["target"], this._loadContent.bind(this)); // add object element to the document

      this.append(object); // IE: must be AFTER the element added to the document

      if (IE) {
        object.set("data", "about:blank");
      }
    },
    _loadContent: function _loadContent(object) {
      var pickerRoot = DOM.constructor(object.get("contentDocument"));
      var pickerBody = pickerRoot.find("body"); // initialize picker content

      pickerRoot.importStyles(PICKER_CSS);
      pickerBody.set(PICKER_BODY_HTML); // internal references

      this._calendarDays = pickerBody.find("table");
      this._calendarMonths = pickerBody.find("table+table");
      this._calendarCaption = pickerBody.find("b"); // picker invalidate handlers

      this._calendarDays.on("picker:invalidate", ["detail"], this._invalidateDays.bind(this));

      this._calendarMonths.on("picker:invalidate", ["detail"], this._invalidateMonths.bind(this));

      pickerBody.on("picker:invalidate", ["detail"], this._invalidateCaption.bind(this)); // picker click handlers

      pickerBody.on(CLICK_EVENT_TYPE, "a", ["currentTarget"], this._clickPickerButton.bind(this));
      pickerBody.on(CLICK_EVENT_TYPE, "td", ["target"], this._clickPickerDay.bind(this));

      this._calendarCaption.on(CLICK_EVENT_TYPE, this._clickCaption.bind(this)); // prevent input from loosing the focus outline


      pickerBody.on(CLICK_EVENT_TYPE, function () {
        return false;
      });

      this._parentInput.on("change", this.invalidateState.bind(this)); // display calendar for autofocused elements


      if (DOM.get("activeElement") === this._parentInput[0]) {
        this.show();
      }
    },
    _invalidateDays: function _invalidateDays(dateValue) {
      var month = dateValue.getMonth();
      var date = dateValue.getDate();
      var year = dateValue.getFullYear();
      var min = new Date((this._parentInput.get("min") || "?") + "T00:00");
      var max = new Date((this._parentInput.get("max") || "?") + "T00:00");
      var iterDate = new Date(year, month, 1); // move to beginning of the first week in current month

      iterDate.setDate(1 - iterDate.getDay() - ampm(1, iterDate.getDay() === 0 ? 7 : 0)); // update days picker

      this._calendarDays.findAll("td").forEach(function (day) {
        iterDate.setDate(iterDate.getDate() + 1);
        var mDiff = month - iterDate.getMonth(),
            selectedValue = null,
            disabledValue = null;
        if (year !== iterDate.getFullYear()) mDiff *= -1;

        if (iterDate < min || iterDate > max) {
          disabledValue = "true";
        } else if (mDiff > 0 || mDiff < 0) {
          selectedValue = "false";
        } else if (date === iterDate.getDate()) {
          selectedValue = "true";
        }

        day._ts = iterDate.getTime();
        day.set("aria-selected", selectedValue);
        day.set("aria-disabled", disabledValue);
        day.value(iterDate.getDate());
      });
    },
    _invalidateMonths: function _invalidateMonths(dateValue) {
      var month = dateValue.getMonth();
      var year = dateValue.getFullYear();
      var min = new Date((this._parentInput.get("min") || "?") + "T00:00");
      var max = new Date((this._parentInput.get("max") || "?") + "T00:00");
      var iterDate = new Date(year, month, 1);

      this._calendarMonths.findAll("td").forEach(function (day, index) {
        iterDate.setMonth(index);
        var mDiff = month - iterDate.getMonth(),
            selectedValue = null;

        if (iterDate < min || iterDate > max) {
          selectedValue = "false";
        } else if (!mDiff) {
          selectedValue = "true";
        }

        day._ts = iterDate.getTime();
        day.set("aria-selected", selectedValue);
      });
    },
    _invalidateCaption: function _invalidateCaption(dateValue) {
      var captionText = dateValue.getFullYear();

      if (this.get("aria-expanded") !== "true") {
        captionText = localeMonthYear(dateValue);
      } // update calendar caption


      this._calendarCaption.value(captionText);
    },
    _clickCaption: function _clickCaption() {
      this.toggleState();
      this.invalidateState();
    },
    _clickPickerButton: function _clickPickerButton(btn) {
      var sign = btn.get("rel") === "next" ? 1 : -1;
      var targetDate = this._parentInput.get("valueAsDate") || new Date();

      if (this.get("aria-expanded") === "true") {
        targetDate.setFullYear(targetDate.getFullYear() + sign);
      } else {
        targetDate.setMonth(targetDate.getMonth() + sign);
      }

      this._parentInput.set("valueAsDate", targetDate).fire("change");
    },
    _clickPickerDay: function _clickPickerDay(target) {
      var targetDate;

      if (this.get("aria-expanded") === "true") {
        if (isNaN(target._ts)) {
          targetDate = new Date();
        } else {
          targetDate = new Date(target._ts);
        } // switch to date calendar mode


        this.toggleState(false);
      } else {
        if (!isNaN(target._ts)) {
          targetDate = new Date(target._ts);
          this.hide();
        }
      }

      if (targetDate != null) {
        this._parentInput.set("valueAsDate", targetDate).fire("change");
      }
    },
    toggleState: function toggleState(expanded) {
      if (typeof expanded !== "boolean") {
        expanded = this.get("aria-expanded") !== "true";
      }

      this.set("aria-expanded", expanded);
    },
    invalidateState: function invalidateState() {
      var expanded = this.get("aria-expanded") === "true";
      var target = expanded ? this._calendarMonths : this._calendarDays;
      var dateValue = this._parentInput.get("valueAsDate") || new Date(); // refresh current picker

      target.fire("picker:invalidate", dateValue);

      if (expanded) {
        this._calendarMonths.show();
      } else {
        this._calendarMonths.hide();
      }
    }
  });
})();

/***/ }),

/***/ "./node_modules/better-dom/dist/better-dom.js":
/*!****************************************************!*\
  !*** ./node_modules/better-dom/dist/better-dom.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * better-dom: Live extension playground
 * @version 4.0.0 Wed, 04 Jul 2018 18:30:49 GMT
 * @link https://github.com/chemerisuk/better-dom
 * @copyright 2018 Maksim Chemerisuk
 * @license MIT
 */
(function () {
  "use strict";
  var WINDOW = window;
  var DOCUMENT = document;
  var HTML = DOCUMENT.documentElement;

  var UNKNOWN_NODE = 0;
  var ELEMENT_NODE = DOCUMENT.ELEMENT_NODE;
  var DOCUMENT_NODE = DOCUMENT.DOCUMENT_NODE;
  var VENDOR_PREFIXES = ["Webkit", "O", "Moz", "ms"];
  var FAKE_ANIMATION_NAME = "v__40000__";
  var SHEET_PROP_NAME = "__40000__sheet";

  var WEBKIT_PREFIX = WINDOW.WebKitAnimationEvent ? "-webkit-" : "";

  var util$index$$arrayProto = Array.prototype;

  var util$index$$every = util$index$$arrayProto.every;
  var util$index$$each = util$index$$arrayProto.forEach;
  var util$index$$filter = util$index$$arrayProto.filter;
  var util$index$$map = util$index$$arrayProto.map;
  var util$index$$slice = util$index$$arrayProto.slice;
  var util$index$$isArray = Array.isArray;
  var util$index$$keys = Object.keys;
  var util$index$$raf = WINDOW.requestAnimationFrame;

  function util$index$$computeStyle(node) {
    return node.ownerDocument.defaultView.getComputedStyle(node);
  }

  function util$index$$injectElement(node) {
    if (node && node.nodeType === ELEMENT_NODE) {
      return node.ownerDocument.getElementsByTagName("head")[0].appendChild(node);
    }
  }
  function MethodError(methodName, args, type) {if (type === void 0) {type = "$Element";}
    var url = "http://chemerisuk.github.io/better-dom/" + type + ".html#" + methodName,
    line = "invalid call `" + type + (type === "DOM" ? "." : "#") + methodName + "(";

    line += util$index$$map.call(args, String).join(", ") + ")`. ";

    this.message = line + "Check " + url + " to verify the arguments";
  }

  MethodError.prototype = new TypeError();

  function StaticMethodError(methodName, args) {
    MethodError.call(this, methodName, args, "DOM");
  }

  StaticMethodError.prototype = new TypeError();

  function DocumentTypeError(methodName, args) {
    MethodError.call(this, methodName, args, "$Document");
  }

  DocumentTypeError.prototype = new TypeError();
  function $Node(node) {
    if (node) {
      this[0] = node;
      // use a generated property to store a reference
      // to the wrapper for circular object binding
      node["__40000__"] = this;
    }
  }

  $Node.prototype = {
    toString: function toString() {return "";},
    valueOf: function valueOf() {return UNKNOWN_NODE;} // undefined
  };

  // fake animation for live extensions
  var STYLE_NODE_HTML = "@" + WEBKIT_PREFIX + "keyframes " + FAKE_ANIMATION_NAME + " {from {opacity:.99} to {opacity:1}}";

  function $Document(node) {
    if (this instanceof $Document) {
      // initialize state and all internal properties
      $Node.call(this, node);
      // add style element to append required css
      var styleNode = node.createElement("style");
      styleNode.innerHTML = STYLE_NODE_HTML;
      util$index$$injectElement(styleNode);
      // store sheet object internally to use in importStyles later
      node[SHEET_PROP_NAME] = styleNode.sheet || styleNode.styleSheet;
    } else if (node) {
      // create a new wrapper or return existing object
      return node["__40000__"] || new $Document(node);
    } else {
      return new $Document();
    }
  }

  var DocumentProto = new $Node();

  $Document.prototype = DocumentProto;

  DocumentProto.valueOf = function () {
    var node = this[0];
    return node ? DOCUMENT_NODE : UNKNOWN_NODE;
  };

  DocumentProto.toString = function () {return "#document";};
  function $Element(node) {
    if (this instanceof $Element) {
      $Node.call(this, node);
    } else if (node) {
      // create a new wrapper or return existing object
      return node["__40000__"] || new $Element(node);
    } else {
      return new $Element();
    }
  }

  var ElementProto = new $Node();

  $Element.prototype = ElementProto;

  ElementProto.valueOf = function () {
    var node = this[0];
    return node ? ELEMENT_NODE : UNKNOWN_NODE;
  };

  ElementProto.toString = function () {
    var node = this[0];

    return node ? "<" + node.tagName.toLowerCase() + ">" : "#unknown";
  };

  var index$$DOM = new $Document(WINDOW.document);
  var index$$_DOM = WINDOW.DOM;

  index$$DOM.constructor = function (node) {
    var nodeType = node && node.nodeType;

    if (nodeType === ELEMENT_NODE) {
      return $Element(node);
    } else if (nodeType === DOCUMENT_NODE) {
      return $Document(node);
    } else {
      return new $Node();
    }
  };

  index$$DOM.noConflict = function () {
    if (WINDOW.DOM === index$$DOM) {
      WINDOW.DOM = index$$_DOM;
    }

    return index$$DOM;
  };

  WINDOW.DOM = index$$DOM;

  var document$create$$reQuick = /^<([a-zA-Z-]+)\/?>$/;
  var document$create$$sandbox = DOCUMENT.createElement("body");

  function document$create$$makeMethod(all) {
    return function (value) {
      var node = this[0];

      if (!node || typeof value !== "string") {
        throw new MethodError("create" + all, arguments);
      }

      var result = all ? [] : null;

      var quickMatch = !result && document$create$$reQuick.exec(value);
      if (quickMatch) {
        return new $Element(node.createElement(quickMatch[1]));
      }

      document$create$$sandbox.innerHTML = value.trim(); // parse HTML string

      for (var it; it = document$create$$sandbox.firstElementChild;) {
        document$create$$sandbox.removeChild(it); // detach element from the sandbox

        if (node !== DOCUMENT) {
          // adopt node for external documents
          it = node.adoptNode(it);
        }

        if (result) {
          result.push(new $Element(it));
        } else {
          result = new $Element(it);
          // need only the first element
          break;
        }
      }

      return result || new $Element();
    };
  }


  $Document.prototype.create = document$create$$makeMethod("");

  $Document.prototype.createAll = document$create$$makeMethod("All");

  // Helper for css selectors

  var util$selectormatcher$$rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\[([\w\-\=]+)\])?(?:\.([\w\-]+))?$/,
  util$selectormatcher$$propName = VENDOR_PREFIXES.concat(null).
  map(function (p) {return (p ? p.toLowerCase() + "M" : "m") + "atchesSelector";}).
  reduceRight(function (propName, p) {return propName || p in HTML && p;}, null);

  var util$selectormatcher$$default = function util$selectormatcher$$default(selector, context) {
    if (typeof selector !== "string") return null;

    var quick = util$selectormatcher$$rquickIs.exec(selector);

    if (quick) {
      // Quick matching is inspired by jQuery:
      //   0  1    2   3          4
      // [ _, tag, id, attribute, class ]
      if (quick[1]) quick[1] = quick[1].toLowerCase();
      if (quick[3]) quick[3] = quick[3].split("=");
      if (quick[4]) quick[4] = " " + quick[4] + " ";
    }

    return function (node) {
      var result, found;
      if (!quick && !util$selectormatcher$$propName) {
        found = (context || node.ownerDocument).querySelectorAll(selector);
      }

      for (; node && node.nodeType === 1; node = node.parentNode) {
        if (quick) {
          result =
          (!quick[1] || node.nodeName.toLowerCase() === quick[1]) && (
          !quick[2] || node.id === quick[2]) && (
          !quick[3] || (quick[3][1] ? node.getAttribute(quick[3][0]) === quick[3][1] : node.hasAttribute(quick[3][0]))) && (
          !quick[4] || (" " + node.className + " ").indexOf(quick[4]) >= 0);

        } else {
          if (util$selectormatcher$$propName) {
            result = node[util$selectormatcher$$propName](selector);
          } else {
            for (var i = 0, n = found.length; i < n; ++i) {
              var n = found[i];

              if (n === node) return n;
            }
          }
        }

        if (result || !context || node === context) break;
      }

      return result && node;
    };
  };

  // Inspired by trick discovered by Daniel Buchner:
  // https://github.com/csuwldcat/SelectorListener

  var document$extend$$extensions = [];
  var document$extend$$EVENT_TYPE = WEBKIT_PREFIX ? "webkitAnimationStart" : "animationstart";
  var document$extend$$CSS_IMPORT_TEXT = [
  WEBKIT_PREFIX + "animation-name:" + FAKE_ANIMATION_NAME + " !important",
  WEBKIT_PREFIX + "animation-duration:1ms !important"].
  join(";");

  function document$extend$$applyLiveExtension(definition, node) {
    var el = $Element(node);
    var ctr = definition.constructor;
    // apply all element mixins
    Object.keys(definition).forEach(function (mixinName) {
      var mixinProperty = definition[mixinName];
      if (mixinProperty !== ctr) {
        el[mixinName] = mixinProperty;
      }
    });

    if (ctr) ctr.call(el);
  }

  $Document.prototype.extend = function (selector, definition) {
    var node = this[0];

    if (!node) return this;

    if (arguments.length === 1 && typeof selector === "object") {
      // handle case when $Document protytype is extended
      util$index$$keys(selector).forEach(function (key) {
        $Document.prototype[key] = selector[key];
      });

      return this;
    } else if (selector === "*") {
      // handle case when $Element protytype is extended
      util$index$$keys(definition).forEach(function (key) {
        $Element.prototype[key] = definition[key];
      });

      return this;
    }

    if (typeof definition === "function") {
      definition = { constructor: definition };
    }

    if (!definition || typeof definition !== "object") {
      throw new DocumentTypeError("extend", arguments);
    }

    var matcher = util$selectormatcher$$default(selector);

    document$extend$$extensions.push([matcher, definition]);
    // use capturing to suppress internal animationstart events
    node.addEventListener(document$extend$$EVENT_TYPE, function (e) {
      var node = e.target;

      if (e.animationName === FAKE_ANIMATION_NAME && matcher(node)) {
        e.stopPropagation(); // this is an internal event
        // prevent any future events
        node.style.setProperty(WEBKIT_PREFIX + "animation-name", "none", "important");

        document$extend$$applyLiveExtension(definition, node);
      }
    }, true);

    // initialize extension manually to make sure that all elements
    // have appropriate methods before they are used in other DOM.extend
    // also fix cases when a matched element already has another LE
    util$index$$each.call(node.querySelectorAll(selector), function (node) {
      // prevent any future events
      node.style.setProperty(WEBKIT_PREFIX + "animation-name", "none", "important");
      // use timeout to invoke constructor safe and async
      WINDOW.setTimeout(function () {
        document$extend$$applyLiveExtension(definition, node);
      }, 0);
    });

    // subscribe selector to a fake animation
    this.importStyles(selector, document$extend$$CSS_IMPORT_TEXT);
  };

  $Document.prototype.mock = function (content) {
    if (!content) return new $Element();

    var result = this.create(content),
    applyExtensions = function applyExtensions(node) {
      document$extend$$extensions.forEach(function (args) {
        var matcher = args[0];
        var definition = args[1];

        if (matcher(node)) {
          document$extend$$applyLiveExtension(definition, node);
        }
      });

      util$index$$each.call(node.children, applyExtensions);
    };

    if (document$extend$$extensions.length) {
      applyExtensions(result[0]);
    }

    return result;
  };

  $Document.prototype.importScripts = function () {var _this = this,_arguments = arguments;for (var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++) {urls[_key] = arguments[_key];}
    var callback = function callback() {
      var node = _this[0];

      if (!node) return;

      var arg = urls.shift(),
      argType = typeof arg,
      script;

      if (argType === "string") {
        script = node.createElement("script");
        script.src = arg;
        script.onload = callback;
        script.async = true;

        util$index$$injectElement(script);
      } else if (argType === "function") {
        arg();
      } else if (arg) {
        throw new DocumentTypeError("importScripts", _arguments);
      }
    };

    callback();
  };

  $Document.prototype.importStyles = function (selector, cssText) {
    var node = this[0];

    if (!node) return;

    if (!cssText && typeof selector === "string") {
      cssText = selector;
      selector = "@media screen";
    }

    if (typeof selector !== "string" || typeof cssText !== "string") {
      throw new DocumentTypeError("importStyles", arguments);
    }

    var styleSheet = node[SHEET_PROP_NAME];
    var lastIndex = styleSheet.cssRules.length;
    // insert rules one by one:
    // failed selector does not break others
    selector.split(",").forEach(function (selector) {
      try {
        lastIndex = styleSheet.insertRule(selector + "{" + cssText + "}", lastIndex);
      } catch (err) {
        // silently ignore invalid rules
      }
    });
  };

  function element$children$$makeMethod(methodName, validSelectorType) {
    return function (selector) {
      if (selector && typeof selector !== validSelectorType) {
        throw new MethodError(methodName, arguments);
      }

      var node = this[0];
      var matcher = util$selectormatcher$$default(selector);
      var children = node ? node.children : [];

      if (typeof selector === "number") {
        if (selector < 0) {
          selector = children.length + selector;
        }

        return $Element(children[selector]);
      } else {
        if (matcher) {
          return util$index$$filter.call(children, matcher).map($Element);
        } else {
          return util$index$$map.call(children, $Element);
        }
      }
    };
  }

  $Element.prototype.child = element$children$$makeMethod("child", "number");

  $Element.prototype.children = element$children$$makeMethod("children", "string");

  var element$classes$$REGEXP_SPACE = /[\n\t\r]/g;
  var element$classes$$normalizedClass = function element$classes$$normalizedClass(node) {return (" " + node.className + " ").replace(element$classes$$REGEXP_SPACE, " ");};

  $Element.prototype.hasClass = function (className) {
    if (typeof className !== "string") {
      throw new MethodError("hasClass", arguments);
    }

    var node = this[0];
    if (!node) return false;

    if (node.classList) {
      return node.classList.contains(className);
    } else {
      return element$classes$$normalizedClass(node).indexOf(" " + className + " ") >= 0;
    }
  };

  $Element.prototype.addClass = function () {var _this2 = this,_arguments2 = arguments;for (var _len2 = arguments.length, classNames = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {classNames[_key2] = arguments[_key2];}
    var node = this[0];
    if (node) {
      classNames.forEach(function (className) {
        if (typeof className !== "string") {
          throw new MethodError("addClass", _arguments2);
        }
        if (node.classList) {
          node.classList.add(className);
        } else if (!_this2.hasClass(className)) {
          _this2[0].className += " " + className;
        }
      });
    }

    return this;
  };

  $Element.prototype.removeClass = function () {var _arguments3 = arguments;for (var _len3 = arguments.length, classNames = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {classNames[_key3] = arguments[_key3];}
    var node = this[0];
    if (node) {
      classNames.forEach(function (className) {
        if (typeof className !== "string") {
          throw new MethodError("removeClass", _arguments3);
        }
        if (node.classList) {
          node.classList.remove(className);
        } else {
          node.className = element$classes$$normalizedClass(node).replace(" " + className + " ", " ").trim();
        }
      });
    }

    return this;
  };

  $Element.prototype.toggleClass = function (className, force) {
    if (typeof className !== "string") {
      throw new MethodError("toggleClass", arguments);
    }

    if (typeof force !== "boolean") {
      force = !this.hasClass(className);
    }

    var node = this[0];
    if (node) {
      if (force) {
        this.addClass(className);
      } else {
        this.removeClass(className);
      }
    }

    return force;
  };

  // Helper for CSS properties access

  var util$stylehooks$$reDash = /\-./g,
  util$stylehooks$$hooks = { get: {}, set: {}, find: function find(name, style) {
      var propName = name.replace(util$stylehooks$$reDash, function (str) {return str[1].toUpperCase();});

      if (!(propName in style)) {
        propName = VENDOR_PREFIXES.
        map(function (prefix) {return prefix + propName[0].toUpperCase() + propName.slice(1);}).
        filter(function (prop) {return prop in style;})[0];
      }

      return this.get[name] = this.set[name] = propName;
    } },
  util$stylehooks$$directions = ["Top", "Right", "Bottom", "Left"],
  util$stylehooks$$shortCuts = {
    font: ["fontStyle", "fontSize", "/", "lineHeight", "fontFamily"],
    padding: util$stylehooks$$directions.map(function (dir) {return "padding" + dir;}),
    margin: util$stylehooks$$directions.map(function (dir) {return "margin" + dir;}),
    "border-width": util$stylehooks$$directions.map(function (dir) {return "border" + dir + "Width";}),
    "border-style": util$stylehooks$$directions.map(function (dir) {return "border" + dir + "Style";}) };


  // normalize float css property
  util$stylehooks$$hooks.get.float = util$stylehooks$$hooks.set.float = "cssFloat";

  // Exclude the following css properties from adding suffix 'px'
  "fill-opacity font-weight line-height opacity orphans widows z-index zoom".split(" ").forEach(function (propName) {
    var stylePropName = propName.replace(util$stylehooks$$reDash, function (str) {return str[1].toUpperCase();});

    util$stylehooks$$hooks.get[propName] = stylePropName;
    util$stylehooks$$hooks.set[propName] = function (value, style) {
      style[stylePropName] = value.toString();
    };
  });

  // normalize property shortcuts
  util$index$$keys(util$stylehooks$$shortCuts).forEach(function (key) {
    var props = util$stylehooks$$shortCuts[key];

    util$stylehooks$$hooks.get[key] = function (style) {
      var result = [],
      hasEmptyStyleValue = function hasEmptyStyleValue(prop, index) {
        result.push(prop === "/" ? prop : style[prop]);

        return !result[index];
      };

      return props.some(hasEmptyStyleValue) ? "" : result.join(" ");
    };

    util$stylehooks$$hooks.set[key] = function (value, style) {
      if (value && "cssText" in style) {
        // normalize setting a complex property across browsers
        style.cssText += ";" + key + ":" + value;
      } else {
        props.forEach(function (name) {return style[name] = typeof value === "number" ? value + "px" : value.toString();});
      }
    };
  });

  var util$stylehooks$$default = util$stylehooks$$hooks;

  $Element.prototype.css = function (name, value) {var _this3 = this;
    var len = arguments.length;
    var node = this[0];

    if (!node) {
      if (len === 1 && util$index$$isArray(name)) {
        return {};
      }

      if (len !== 1 || typeof name !== "string") {
        return this;
      }

      return;
    }

    var style = node.style;
    var computed;

    if (len === 1 && (typeof name === "string" || util$index$$isArray(name))) {
      var strategy = function strategy(name) {
        var getter = util$stylehooks$$default.get[name] || util$stylehooks$$default.find(name, style),
        value = typeof getter === "function" ? getter(style) : style[getter];

        if (!value) {
          if (!computed) computed = util$index$$computeStyle(node);

          value = typeof getter === "function" ? getter(computed) : computed[getter];
        }

        return value;
      };

      if (typeof name === "string") {
        return strategy(name);
      } else {
        return name.map(strategy).reduce(function (memo, value, index) {
          memo[name[index]] = value;

          return memo;
        }, {});
      }
    }

    if (len === 2 && typeof name === "string") {
      var setter = util$stylehooks$$default.set[name] || util$stylehooks$$default.find(name, style);

      if (typeof value === "function") {
        value = value(this);
      }

      if (value == null) value = "";

      if (typeof setter === "function") {
        setter(value, style);
      } else {
        style[setter] = typeof value === "number" ? value + "px" : value.toString();
      }
    } else if (len === 1 && name && typeof name === "object") {
      util$index$$keys(name).forEach(function (key) {_this3.css(key, name[key]);});
    } else {
      throw new MethodError("css", arguments);
    }

    return this;
  };

  function element$manipulation$$makeMethod(fastStrategy, requiresParent, strategy) {
    return function () {var _this4 = this;
      var node = this[0];

      if (!node || requiresParent && !node.parentNode) return this;

      // the idea of the algorithm is to construct HTML string
      // when possible or use document fragment as a fallback to
      // invoke manipulation using a single method call
      var fragment = fastStrategy ? "" : node.ownerDocument.createDocumentFragment();for (var _len4 = arguments.length, contents = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {contents[_key4] = arguments[_key4];}

      contents.forEach(function (content) {
        if (typeof content === "function") {
          content = content(_this4);
        }

        if (typeof content === "string") {
          if (typeof fragment === "string") {
            fragment += content.trim();
          } else {
            content = $Document(node.ownerDocument).createAll(content);
          }
        } else if (content instanceof $Element) {
          content = [content];
        }

        if (util$index$$isArray(content)) {
          if (typeof fragment === "string") {
            // append existing string to fragment
            content = $Document(node.ownerDocument).createAll(fragment).concat(content);
            // fallback to document fragment strategy
            fragment = node.ownerDocument.createDocumentFragment();
          }

          content.forEach(function (el) {
            fragment.appendChild(el[0]);
          });
        }
      });

      if (typeof fragment === "string") {
        node.insertAdjacentHTML(fastStrategy, fragment);
      } else {
        strategy(node, fragment);
      }

      return this;
    };
  }

  $Element.prototype.after = element$manipulation$$makeMethod("afterend", true, function (node, relatedNode) {
    node.parentNode.insertBefore(relatedNode, node.nextSibling);
  });

  $Element.prototype.before = element$manipulation$$makeMethod("beforebegin", true, function (node, relatedNode) {
    node.parentNode.insertBefore(relatedNode, node);
  });

  $Element.prototype.prepend = element$manipulation$$makeMethod("afterbegin", false, function (node, relatedNode) {
    node.insertBefore(relatedNode, node.firstChild);
  });

  $Element.prototype.append = element$manipulation$$makeMethod("beforeend", false, function (node, relatedNode) {
    node.appendChild(relatedNode);
  });

  $Element.prototype.replace = element$manipulation$$makeMethod("", true, function (node, relatedNode) {
    node.parentNode.replaceChild(relatedNode, node);
  });

  $Element.prototype.remove = element$manipulation$$makeMethod("", true, function (node) {
    node.parentNode.removeChild(node);
  });

  var util$selectorhooks$$default = {
    ":focus": function focus(node) {return node === node.ownerDocument.activeElement;}

    // ":visible": (node) => !isHidden(node),

    // ":hidden": isHidden
  };

  $Element.prototype.matches = function (selector) {
    if (!selector || typeof selector !== "string") {
      throw new MethodError("matches", arguments);
    }

    var checker = util$selectorhooks$$default[selector] || util$selectormatcher$$default(selector);

    return !!checker(this[0]);
  };

  $Element.prototype.offset = function () {
    var node = this[0];
    var result = { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };

    if (node) {
      var docEl = (node.ownerDocument || node).documentElement;
      var clientTop = docEl.clientTop;
      var clientLeft = docEl.clientLeft;
      var scrollTop = WINDOW.pageYOffset || docEl.scrollTop;
      var scrollLeft = WINDOW.pageXOffset || docEl.scrollLeft;
      var boundingRect = node.getBoundingClientRect();

      result.top = boundingRect.top + scrollTop - clientTop;
      result.left = boundingRect.left + scrollLeft - clientLeft;
      result.right = boundingRect.right + scrollLeft - clientLeft;
      result.bottom = boundingRect.bottom + scrollTop - clientTop;
      result.width = boundingRect.right - boundingRect.left;
      result.height = boundingRect.bottom - boundingRect.top;
    }

    return result;
  };

  function element$traversing$$makeMethod(methodName, propertyName, all) {
    return function (selector) {
      if (selector && typeof selector !== "string") {
        throw new MethodError(methodName, arguments);
      }

      var node = this[0];
      var result = all ? [] : null;

      if (node) {
        var matcher = util$selectormatcher$$default(selector);
        // method closest starts traversing from the element itself
        // except no selector was specified where it returns parent
        if (node && (!matcher || methodName !== "closest")) {
          node = node[propertyName];
        }

        for (var it = node; it; it = it[propertyName]) {
          if (!matcher || matcher(it)) {
            if (result) {
              result.push($Element(it));
            } else {
              result = $Element(it);
              // need only the first element
              break;
            }
          }
        }
      }

      return result || new $Element();
    };
  }

  $Element.prototype.next = element$traversing$$makeMethod("next", "nextElementSibling");

  $Element.prototype.prev = element$traversing$$makeMethod("prev", "previousElementSibling");

  $Element.prototype.nextAll = element$traversing$$makeMethod("nextAll", "nextElementSibling", true);

  $Element.prototype.prevAll = element$traversing$$makeMethod("prevAll", "previousElementSibling", true);

  $Element.prototype.closest = element$traversing$$makeMethod("closest", "parentNode");

  $Element.prototype.value = function (content) {
    var node = this[0];

    if (!node) return content ? this : void 0;

    var tagName = node.tagName;

    if (content === void 0) {
      if (tagName === "SELECT") {
        return ~node.selectedIndex ? node.options[node.selectedIndex].value : "";
      } else if (tagName === "OPTION") {
        return node.hasAttribute("value") ? node.value : node.text;
      } else if (tagName === "INPUT" || tagName === "TEXTAREA") {
        return node.value;
      } else {
        return node.textContent;
      }
    } else {
      switch (tagName) {
        case "INPUT":
        case "OPTION":
        case "TEXTAREA":
          if (typeof content === "function") {
            content = content(node.value);
          }
          node.value = content;
          break;

        case "SELECT":
          if (typeof content === "function") {
            content = content(node.value);
          }
          if (util$index$$every.call(node.options, function (o) {return !(o.selected = o.value === content);})) {
            node.selectedIndex = -1;
          }
          break;

        default:
          if (typeof content === "function") {
            content = content(node.textContent);
          }
          node.textContent = content;}


      return this;
    }
  };


  $Element.prototype.empty = function () {
    return this.value("");
  };

  var util$animationhandler$$TRANSITION_EVENT_TYPE = WEBKIT_PREFIX ? "webkitTransitionEnd" : "transitionend";
  var util$animationhandler$$ANIMATION_EVENT_TYPE = WEBKIT_PREFIX ? "webkitAnimationEnd" : "animationend";

  function util$animationhandler$$AnimationHandler(node, animationName) {
    this.node = node;
    this.style = node.style;
    this.eventType = animationName ? util$animationhandler$$ANIMATION_EVENT_TYPE : util$animationhandler$$TRANSITION_EVENT_TYPE;
    this.animationName = animationName;
  }

  util$animationhandler$$AnimationHandler.prototype = {
    handleEvent: function handleEvent(e) {
      if (!this.animationName || e.animationName === this.animationName) {
        if (this.animationName) {
          this.style.animationName = "";
          this.style.animationDirection = "";
        }

        this.node.removeEventListener(this.eventType, this, true);

        if (typeof this.callback === "function") {
          this.callback();
        }
      }
    },
    start: function start(callback, animationDirection) {
      this.callback = callback;

      if (this.animationName) {
        this.style.animationName = this.animationName;
        this.style.animationDirection = animationDirection;
      }

      this.node.addEventListener(this.eventType, this, true);
    } };


  var util$animationhandler$$default = util$animationhandler$$AnimationHandler;

  function element$visibility$$makeMethod(methodName, condition) {
    return function (animationName, callback) {var _this5 = this;
      if (typeof animationName !== "string") {
        callback = animationName;
        animationName = null;
      }

      if (callback && typeof callback !== "function") {
        throw new MethodError(methodName, arguments);
      }

      var node = this[0];

      if (!node) return this;

      var computed = util$index$$computeStyle(node);
      // Determine of we need animation by checking if an element
      // has non-zero width. Triggers reflow but fixes animation
      // for new elements inserted into the DOM in some browsers

      if (node && computed.width) {
        var complete = function complete() {
          node.style.visibility = condition ? "hidden" : "inherit";

          if (typeof callback === "function") {
            callback(_this5);
          }
        };

        if (!node.ownerDocument.documentElement.contains(node)) {
          util$index$$raf(complete); // skip animating of detached elements
        } else if (!animationName && parseFloat(computed["transition-duration"]) === 0) {
          util$index$$raf(complete); // skip animating with zero transition duration
        } else if (animationName && parseFloat(computed["animation-duration"]) === 0) {
          util$index$$raf(complete); // skip animating with zero animation duration
        } else {
          // always make an element visible before animation start
          node.style.visibility = "visible";

          new util$animationhandler$$default(node, animationName).
          start(complete, condition ? "normal" : "reverse");
        }
      }
      // trigger CSS3 transition if it exists
      return this.set("aria-hidden", String(condition));
    };
  }

  $Element.prototype.show = element$visibility$$makeMethod("show", false);

  $Element.prototype.hide = element$visibility$$makeMethod("hide", true);

  $Node.prototype.clone = function (deepCopy) {
    if (typeof deepCopy !== "boolean") {
      throw new MethodError("clone", arguments);
    }

    var node = this[0];

    if (node) {
      var clonedNode = node.cloneNode(deepCopy);

      if (this instanceof $Element) {
        return new $Element(clonedNode);
      } else if (this instanceof $Document) {
        return new $Document(clonedNode);
      }
    }

    return new $Node();
  };

  $Node.prototype.contains = function (element) {
    var node = this[0];

    if (!node) return false;

    if (element instanceof $Element) {
      var otherNode = element[0];

      if (otherNode === node) return true;
      if (node.contains) {
        return node.contains(otherNode);
      } else {
        return node.compareDocumentPosition(otherNode) & 16;
      }
    }

    throw new MethodError("contains", arguments);
  };

  // big part of code inspired by Sizzle:
  // https://github.com/jquery/sizzle/blob/master/sizzle.js

  var node$find$$REGEXP_QUICK = /^(?:(\w+)|\.([\w\-]+))$/;
  var node$find$$REGEXP_ESCAPE = /'|\\/g;

  function node$find$$makeMethod(methodName, all) {
    return function (selector) {
      if (typeof selector !== "string") {
        throw new MethodError(methodName, arguments);
      }

      var node = this[0];

      if (!node) return all ? [] : new $Node();

      var quickMatch = node$find$$REGEXP_QUICK.exec(selector);
      var result, old, nid, context;

      if (quickMatch) {
        if (quickMatch[1]) {
          // speed-up: "TAG"
          result = node.getElementsByTagName(selector);
        } else {
          // speed-up: ".CLASS"
          result = node.getElementsByClassName(quickMatch[2]);
        }

        if (result && !all) result = result[0];
      } else {
        old = true;
        context = node;

        if (!(this instanceof $Document)) {
          // qSA works strangely on Element-rooted queries
          // We can work around this by specifying an extra ID on the root
          // and working up from there (Thanks to Andrew Dupont for the technique)
          if (old = node.getAttribute("id")) {
            nid = old.replace(node$find$$REGEXP_ESCAPE, "\\$&");
          } else {
            nid = "___40000__";
            node.setAttribute("id", nid);
          }

          nid = "[id='" + nid + "'] ";
          selector = nid + selector.split(",").join("," + nid);
        }

        result = context["querySelector" + all](selector);

        if (!old) node.removeAttribute("id");
      }

      return all ? util$index$$map.call(result, $Element) : $Element(result);
    };
  }

  $Node.prototype.find = node$find$$makeMethod("find", "");

  $Node.prototype.findAll = node$find$$makeMethod("findAll", "All");

  var util$eventhooks$$hooks = {};
  if ("onfocusin" in HTML) {
    util$eventhooks$$hooks.focus = function (handler) {handler._type = "focusin";};
    util$eventhooks$$hooks.blur = function (handler) {handler._type = "focusout";};
  } else {
    // firefox doesn't support focusin/focusout events
    util$eventhooks$$hooks.focus = util$eventhooks$$hooks.blur = function (handler) {
      handler.options.capture = true;
    };
  }
  if (DOCUMENT.createElement("input").validity) {
    util$eventhooks$$hooks.invalid = function (handler) {
      handler.options.capture = true;
    };
  }

  var util$eventhooks$$default = util$eventhooks$$hooks;

  // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
  var util$eventhandler$$supportsPassive = false;
  try {
    var util$eventhandler$$opts = Object.defineProperty({}, "passive", {
      get: function get() {
        util$eventhandler$$supportsPassive = true;
      } });

    WINDOW.addEventListener("test", null, util$eventhandler$$opts);
  } catch (e) {}

  function util$eventhandler$$EventHandler(context, node, options, args) {
    this.context = context;
    this.node = node;
    this.options = options;
    this.args = args;

    if (options.selector) {
      this.matcher = util$selectormatcher$$default(options.selector, node);
    }
  }

  util$eventhandler$$EventHandler.prototype = {
    handleEvent: function handleEvent(e) {
      this.event = e;
      // update value of currentTarget if selector exists
      this.currentTarget = this.matcher ? this.matcher(e.target) : this.node;
      // early stop when target doesn't match selector
      if (this.currentTarget) {
        if (this.options.once === true) {
          this.unsubscribe();
        }

        var args = this.args.map(this.getEventProperty, this);
        // prevent default if handler returns false
        if (this.callback.apply(this.context, args) === false) {
          e.preventDefault();
        }
      }
    },
    getEventProperty: function getEventProperty(name) {var _arguments4 = arguments;
      var e = this.event;
      if (name === "type") {
        return this.type;
      } else if (name === "target" || name === "relatedTarget") {
        return $Element(e[name]);
      } else if (name === "currentTarget") {
        return $Element(this.currentTarget);
      }

      var value = e[name];
      if (typeof value === "function") {
        return function () {return value.apply(e, _arguments4);};
      } else {
        return value;
      }
    },
    subscribe: function subscribe(type, callback) {
      var hook = util$eventhooks$$default[type];

      this.type = type;
      this.callback = callback;

      if (hook) hook(this);

      this.node.addEventListener(this._type || this.type, this, this.getLastArgument());
    },
    unsubscribe: function unsubscribe() {
      this.node.removeEventListener(this._type || this.type, this, this.getLastArgument());
    },
    getLastArgument: function getLastArgument() {
      var lastArg = !!this.options.capture;
      if (this.options.passive && util$eventhandler$$supportsPassive) {
        lastArg = { passive: true, capture: lastArg };
      }
      return lastArg;
    } };


  var util$eventhandler$$default = util$eventhandler$$EventHandler;

  $Node.prototype.fire = function (type, detail) {
    var node = this[0];
    var e, eventType, canContinue;

    if (typeof type === "string") {
      var hook = util$eventhooks$$default[type],
      handler = { options: {} };

      if (hook) handler = hook(handler) || handler;

      eventType = handler._type || type;
    } else {
      throw new MethodError("fire", arguments);
    }

    if (!node) return true;

    e = (node.ownerDocument || node).createEvent("CustomEvent");
    e.initCustomEvent(eventType, true, true, detail);
    canContinue = node.dispatchEvent(e);

    // call native function to trigger default behavior
    if (canContinue && node[type]) {
      var _handleEvent = util$eventhandler$$default.prototype.handleEvent;
      // intercept handleEvent to prevent double event callbacks
      util$eventhandler$$default.prototype.handleEvent = function (e) {
        // prevent re-triggering of the current event
        if (this.type !== type) {
          return _handleEvent.call(this, e);
        }
      };

      node[type]();
      // restore original method
      util$eventhandler$$default.prototype.handleEvent = _handleEvent;
    }

    return canContinue;
  };
  var util$accessorhooks$$hooks = { get: {}, set: {} };

  // fix camel cased attributes
  "tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" ").forEach(function (key) {
    util$accessorhooks$$hooks.get[key.toLowerCase()] = function (node) {return node[key];};
  });

  // style hook
  util$accessorhooks$$hooks.get.style = function (node) {return node.style.cssText;};
  util$accessorhooks$$hooks.set.style = function (node, value) {node.style.cssText = value;};
  // some browsers don't recognize input[type=email] etc.
  util$accessorhooks$$hooks.get.type = function (node) {return node.getAttribute("type") || node.type;};

  var util$accessorhooks$$default = util$accessorhooks$$hooks;

  $Node.prototype.get = function (name, defaultValue) {var _this6 = this;
    var node = this[0];
    var hook = util$accessorhooks$$default.get[name];
    var value;

    if (!node) return value;

    if (arguments.length === 0) {
      return node.innerHTML;
    }

    if (hook) {
      value = hook(node, name);
    } else if (typeof name === "string") {
      if (name in node) {
        value = node[name];
      } else if (this instanceof $Element) {
        value = node.getAttribute(name);
      } else {
        value = null;
      }
    } else if (util$index$$isArray(name)) {
      value = name.reduce(function (memo, key) {
        return memo[key] = _this6.get(key), memo;
      }, {});
    } else {
      throw new MethodError("get", arguments);
    }

    return value != null ? value : defaultValue;
  };

  $Node.prototype.on = function (type, options, args, callback) {
    if (typeof type === "string") {
      if (typeof options === "string") {
        options = { selector: options };
      } else if (typeof options === "function") {
        callback = options;
        options = {};
        args = [];
      } else if (typeof options === "object") {
        if (util$index$$isArray(options)) {
          callback = args;
          args = options;
          options = {};
        }
      }

      if (typeof args === "function") {
        callback = args;
        args = [];
      }

      if (options && typeof options === "object" && typeof callback === "function") {
        var node = this[0];

        if (!node) return function () {};

        var handler = new util$eventhandler$$default(this, node, options, args);
        handler.subscribe(type, callback);
        return function () {return handler.unsubscribe();};
      }
    }

    throw new MethodError("on", arguments);
  };

  $Node.prototype.set = function (name, value) {var _this7 = this;
    var node = this[0];
    var len = arguments.length;
    var hook = util$accessorhooks$$default.set[name];

    if (node) {
      if (typeof name === "string") {
        if (len === 1) {// innerHTML shortcut
          value = name;
          name = "innerHTML";
        }

        if (typeof value === "function") {
          value = value(this.get(name));
        }

        if (hook) {
          hook(node, value);
        } else if (value == null && this instanceof $Element) {
          node.removeAttribute(name);
        } else if (name in node) {
          node[name] = value;
        } else if (this instanceof $Element) {
          node.setAttribute(name, value);
        }
      } else if (util$index$$isArray(name)) {
        if (len === 1) {
          node.textContent = ""; // clear node children
          this.append.apply(this, name);
        } else {
          name.forEach(function (key) {_this7.set(key, value);});
        }
      } else if (typeof name === "object") {
        util$index$$keys(name).forEach(function (key) {_this7.set(key, name[key]);});
      } else {
        throw new MethodError("set", arguments);
      }
    }

    return this;
  };
})();

/***/ }),

/***/ "./rijkshuisstijl/js/compat.js":
/*!*************************************!*\
  !*** ./rijkshuisstijl/js/compat.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var better_dom_dist_better_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! better-dom/dist/better-dom */ "./node_modules/better-dom/dist/better-dom.js");
/* harmony import */ var better_dom_dist_better_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(better_dom_dist_better_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var better_dateinput_polyfill_dist_better_dateinput_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! better-dateinput-polyfill/dist/better-dateinput-polyfill */ "./node_modules/better-dateinput-polyfill/dist/better-dateinput-polyfill.js");
/* harmony import */ var better_dateinput_polyfill_dist_better_dateinput_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(better_dateinput_polyfill_dist_better_dateinput_polyfill__WEBPACK_IMPORTED_MODULE_1__);


/***/ })

/******/ });