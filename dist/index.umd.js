!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.telebug=n():e.telebug=n()}(this,function(){return function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="./dist/",n(n.s=3)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){if("function"!=typeof e)throw new Error("consolePatch: fn must be a function");var n=console.warn.bind(console),t=console.error.bind(console);console.warn=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];e.apply(void 0,["warn"].concat(r)),n.apply(void 0,r)},console.error=function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];e.apply(void 0,["error"].concat(r)),t.apply(void 0,r)}}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,n){var t=new XMLHttpRequest;t.open("POST",e,!0),t.setRequestHeader("Content-Type","application/json; charset=UTF-8"),t.send(JSON.stringify(n))}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e){if("function"!=typeof e)throw new Error("unhandle: fn must me a function");window.addEventListener("error",e),window.addEventListener("unhandledrejection",e)}},function(e,n,t){"use strict";var r=t(0).default,o=t(2).default,u=t(1).default,i=function(){for(var e=arguments.length,n=Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.reduce(function(e,n){return function(){return e(n.apply(void 0,arguments))}})},a=function(){var e=!1;return function(){function n(e){for(var n=a(),t=arguments.length,r=Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=arguments[o];return n+=r.length?"\n`console."+e+"("+r.join(", ")+")`":""}function t(e){var n=a();return e.filename&&(n+="\nFile: "+e.filename+":"+e.lineno+":"+e.colno),e.message&&(n+="\nMessage: "+e.message),e.stack?n+="\n`"+e.stack+"`":(e.error&&e.error.stack?n+="\n`"+e.error.stack+"`":e.error?n+="\n`"+e.error+"`":n+="\n`"+e+"`",n)}function a(){var e="";return e+="\n"+location.href,e+="\n"+navigator.userAgent,v.forEach(function(n){return e+="\n"+n}),e}function c(e){console.info(e),u(p+"/sendMessage",{chat_id:l,disable_web_page_preview:!0,parse_mode:"markdown",text:e})}function s(e){v.push(e)}var f=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!f.chatId)throw new Error("chatId must be provided");if(e)throw new Error("Telebug already inited");e=!0;var d=f.botId||"474186924:AAGtoPx1A_q9MoLdhRCin5EmGwN7xlC_21g",l=f.chatId,p="https://api.telegram.org/bot"+d,v=f.customMessage?[f.customMessage]:[];return o(i(c,t)),r(i(c,n)),{sendMessage:c,addCustomMessage:s}}}();e.exports=a}])});
//# sourceMappingURL=index.umd.js.map