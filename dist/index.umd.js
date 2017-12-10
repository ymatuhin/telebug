(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["telebug"] = factory();
	else
		root["telebug"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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

exports.default = function (url, formData, cb) {
  var request = new XMLHttpRequest();
  request.open('POST', url);
  request.send(formData);
  request.onload = cb;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, params) {
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(params));
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fn) {
  if (typeof fn !== 'function') throw new Error('unhandle: fn must me a function');
  window.addEventListener('error', fn);
  window.addEventListener('unhandledrejection', fn);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var consolePatch = __webpack_require__(0).default;

var unhandleSubscribe =  true ? __webpack_require__(3).default : require('./unhandle.node').default;

var httpPost =  true ? __webpack_require__(2).default : require('./http.post.node').default;

var httpFormData =  true ? __webpack_require__(1).default : null;

var telebug = function () {
  var inited = false;

  return function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!config.chatId) throw new Error('chatId must be provided');
    if (inited) throw new Error('Telebug already inited');
    inited = true;

    var defaultBotId = '474186924:AAGtoPx1A_q9MoLdhRCin5EmGwN7xlC_21g';
    var botId = config.botId || defaultBotId;
    var chatId = config.chatId;
    var apiUrl = 'https://api.telegram.org/bot' + botId;
    var customMessages = config.customMessage ? [config.customMessage] : [];

    unhandleSubscribe(handleError);
    consolePatch(handleConsole);

    function handleError(error) {
      var message = createErrorMessage(error);
      handleErrorMessage(message);
    }

    function handleConsole() {
      var message = createConsoleMessage.apply(undefined, arguments);
      handleErrorMessage(message);
    }

    function handleErrorMessage(message) {
      if (true) {
        if (!window.html2canvas) return;
        var onPhotoSent = function onPhotoSent() {
          return sendMessage(message);
        };
        makeScreenShot(function (blob) {
          return sendPhoto(blob, onPhotoSent);
        });
      } else sendMessage(message);
    }

    function createConsoleMessage(type) {
      var md = getCommonInfo();

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      md += args.length ? '\n`console.' + type + '(' + args.join(', ') + ')`' : '';
      return md;
    }

    function createErrorMessage(error) {
      var md = getCommonInfo();

      if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
        var originalError = error.error || error;
        if (originalError.stack) md += '\n`' + originalError.stack + '`';else md += '\n`' + originalError.message + '`';
      } else {
        md += '\n' + error;
      }

      return md;
    }

    function getCommonInfo() {
      var md = '*' + ( true ? 'browser' : 'server') + '*';
      md +=  true ? '\n' + location.href : '';
      md +=  true ? '\n' + navigator.userAgent : '';
      customMessages.forEach(function (msg) {
        return md += '\n' + msg;
      });
      return md;
    }

    function makeScreenShot(cb) {
      var promise = html2canvas(document.body);
      promise.then(function (canvas) {
        canvas.toBlob(cb, 'image/jpeg', 0.7);
      });
    }

    function sendPhoto(blob, cb) {
      var url = apiUrl + '/sendPhoto';
      var formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('photo', blob);
      httpFormData(url, formData, cb);
    }

    function sendMessage(text) {
      var url = apiUrl + '/sendMessage';
      httpPost(url, {
        chat_id: chatId,
        disable_web_page_preview: true,
        parse_mode: 'markdown',
        text: text
      });
    }

    function addCustomMessage(message) {
      customMessages.push(message);
    }

    return {
      sendMessage: sendMessage,
      sendPhoto: sendPhoto,
      addCustomMessage: addCustomMessage
    };
  };
}();

module.exports = telebug;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map