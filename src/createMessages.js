const escape = require('lodash.escape');
const getErrorInfo = require('./getErrorInfo').default;

export function createConsoleMessage(type, ...args) {
  if (!type) return;
  if (args.length) {
    const msg = args.reduce((acc, val, index) => {
      const comma = index === 0 ? '' : ', ';
      return acc + comma + JSON.stringify(val);
    }, '');
    return `\n<pre>console.${type}(${msg})</pre>`;
  }
}

export function createErrorMessage(error) {
  const info = getErrorInfo(error);
  let md = ``;
  if (info.file) md += `\n${escape(info.file)}`;
  if (info.message) md += `\n${escape(info.message)}`;
  if (info.stack) md += '\n<pre>' + escape(info.stack) + '</pre>';
  return md;
}
