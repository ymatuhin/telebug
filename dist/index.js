(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("https"), require("process"));
	else if(typeof define === 'function' && define.amd)
		define(["https", "process"], factory);
	else if(typeof exports === 'object')
		exports["errorsToTelegram"] = factory(require("https"), require("process"));
	else
		root["errorsToTelegram"] = factory(root["https"], root["process"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fn) {
  if (typeof fn !== 'function') throw new Error('consolePatch: fn must be a function');

  var originalWarn = console.warn.bind(console);
  var originalError = console.error.bind(console);

  console.warn = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    fn.apply(undefined, ['warn'].concat(args)), originalWarn.apply(undefined, args);
  };
  console.error = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    fn.apply(undefined, ['error'].concat(args)), originalError.apply(undefined, args);
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var https = __webpack_require__(4);

exports.default = function (url, params) {
  var _url$slice$split = url.slice(8).split('.org'),
      _url$slice$split2 = _slicedToArray(_url$slice$split, 2),
      host = _url$slice$split2[0],
      path = _url$slice$split2[1];

  var postData = JSON.stringify(params);

  var options = {
    hostname: host + '.org',
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Content-Length': postData.length
    }
  };

  var req = https.request(options);
  req.write(postData);
  req.end();
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var process = __webpack_require__(5);

exports.default = function (fn) {
  if (typeof fn !== 'function') throw new Error('unhandle: fn must be a function');

  process.on('uncaughtException', fn);
  process.on('unhandledRejection', fn);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var consolePatch = __webpack_require__(0).default;

var unhandleSubscribe =  false ? require('./unhandle.browser').default : __webpack_require__(2).default;

var httpPost =  false ? require('./http.post.browser').default : __webpack_require__(1).default;

var httpFormData =  false ? require('./http.formData.browser').default : null;

var errorsToTelegram = function () {
  function errorsToTelegram(config) {
    _classCallCheck(this, errorsToTelegram);

    this.inited = false;
    this.botId = null;
    this.chatId = null;
  }

  _createClass(errorsToTelegram, [{
    key: 'init',
    value: function init() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.inited) throw new Error('errorsToTelegram already inited');
      if (!config.botId) throw new Error('botId must be provided');
      if (!config.chatId) throw new Error('chatId must be provided');

      this.botId = config.botId;
      this.chatId = config.chatId;
      this.apiUrl = 'https://api.telegram.org/bot' + this.botId;
      this.inited = true;

      unhandleSubscribe(this.handleError.bind(this));
      consolePatch(this.handleConsole.bind(this));
    }
  }, {
    key: 'handleError',
    value: function handleError(error) {
      var message = this.createErrorMessage(error);
      this.handleErrorMessage(message);
    }
  }, {
    key: 'handleConsole',
    value: function handleConsole() {
      var message = this.createConsoleMessage.apply(this, arguments);
      this.handleErrorMessage(message);
    }
  }, {
    key: 'handleErrorMessage',
    value: function handleErrorMessage(message) {
      var _this = this;

      if (false) {
        if (!window.html2canvas) return;
        var onPhotoSent = function onPhotoSent() {
          return _this.sendMessage(message);
        };
        this.makeScreenShot(function (blob) {
          return _this.sendPhoto(blob, onPhotoSent);
        });
      } else this.sendMessage(message);
    }
  }, {
    key: 'getCommonInfo',
    value: function getCommonInfo() {
      var md = '*' + ( false ? 'browser' : 'server') + '*';
      md +=  false ? '\n' + location.href : '';
      md +=  false ? '\n' + navigator.userAgent : '';
      return md;
    }
  }, {
    key: 'createConsoleMessage',
    value: function createConsoleMessage(type) {
      var md = this.getCommonInfo();

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      md += args.length ? '\n`console.' + type + '(' + args.join(', ') + ')`' : '';
      return md;
    }
  }, {
    key: 'createErrorMessage',
    value: function createErrorMessage(error) {
      var md = this.getCommonInfo();

      if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
        var originalError = error.error || error;
        if (originalError.stack) md += '\n`' + originalError.stack + '`';else md += '\n`' + originalError.message + '`';
      } else {
        md += '\n' + error;
      }

      return md;
    }
  }, {
    key: 'makeScreenShot',
    value: function makeScreenShot(cb) {
      var promise = html2canvas(document.body);
      promise.then(function (canvas) {
        canvas.toBlob(cb, 'image/jpeg', 0.7);
      });
    }
  }, {
    key: 'sendPhoto',
    value: function sendPhoto(blob, cb) {
      var url = this.apiUrl + '/sendPhoto';
      var formData = new FormData();
      formData.append('chat_id', this.chatId);
      formData.append('photo', blob);
      httpFormData(url, formData, cb);
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage(text) {
      var url = this.apiUrl + '/sendMessage';
      httpPost(url, {
        chat_id: this.chatId,
        disable_web_page_preview: true,
        parse_mode: 'markdown',
        text: text
      });
    }
  }]);

  return errorsToTelegram;
}();

module.exports = new errorsToTelegram();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map