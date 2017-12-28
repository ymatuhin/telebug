export { default as isObject } from './isObject';
export { default as consolePatch } from './consolePatch';
export { default as validateParam } from './validateParam';
export { default as errorFactory } from './errorFactory';
export { default as createErrorMessage } from './createErrorMessage';
export { default as unhandledBrowserError } from './unhandled.error.browser';
export { default as unhandledNodeError } from './unhandled.error.node';
export { default as unhandledPromise } from './unhandled.promise';

export const httpPost = process.env.BROWSER
  ? require('./http.post.browser.js').default
  : require('./http.post.node.js').default;

export const getCommonInfo = process.env.BROWSER
  ? require('./getCommonInfo.browser.js').default
  : require('./getCommonInfo.node.js').default;
