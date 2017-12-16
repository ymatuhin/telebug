const escape = require('lodash.escape');

export default info => {
  let md = ``;
  if (info.file) md += `\nFile: ${escape(info.file)}`;
  if (info.message) md += `\nMessage: <code>${escape(info.message)}</code>`;
  if (info.stack) md += '\n<pre>' + escape(info.stack) + '</pre>';
  return md;
};
