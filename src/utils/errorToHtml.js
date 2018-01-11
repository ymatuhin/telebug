// @flow

import platform from 'platform';
import escape from 'lodash.escape';
import { isBrowser } from './env';

export default function errorToHtml({
  node,
  window,
  userAgent,
  href,
  message,
  filename,
  reason,
  stack,
  events,
}) {
  let str = '';
  if (node) str += `<b>Node ${node}</b>`;
  if (isBrowser) str += `<b>${platform.description || userAgent}</b>`;
  if (window) str += `\nWindow: ${window}`;
  if (href) str += `\nUrl: ${escape(href)}`;
  if (filename) str += `\nFile: ${escape(filename)}`;
  if (message) {
    const stackHasMessage = stack && stack.indexOf(message) !== -1;
    if (!stackHasMessage) str += `\nMessage: <code>${escape(message)}</code>`;
  }
  if (reason) str += `\nReason: <code>${escape(reason)}</code>`;
  str += '\n<pre>';
  if (stack) str += `${escape(stack)}`;
  if (events) str += `\n\n${escape(events)}`;
  str += '</pre>';
  return str;
}
