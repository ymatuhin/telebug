export { default as isObject } from './isObject';
export { default as consolePatch } from './consolePatch';
export { default as validateParam } from './validateParam';
export { default as errorFactory } from './errorFactory';
export { default as getErrorInfo } from './getErrorInfo';
export { default as createConsoleMessage } from './createConsoleMessage';
export { default as createErrorMessage } from './createErrorMessage';

export const httpPost = process.env.BROWSER
  ? require('./http.post.browser.js').default
  : require('./http.post.node.js').default;

export const unhandled = process.env.BROWSER
  ? require('./unhandled.browser.js').default
  : require('./unhandled.node.js').default;

export const getCommonInfo = process.env.BROWSER
  ? require('./getCommonInfo.browser.js').default
  : require('./getCommonInfo.node.js').default;
