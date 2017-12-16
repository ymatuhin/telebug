const escape = require('lodash.escape');

export default info => {
  let md = ``;
  if (info.file) md += `\n${escape(info.file)}`;
  if (info.message) md += `\n${escape(info.message)}`;
  if (info.stack) md += '\n<pre>' + escape(info.stack) + '</pre>';
  return md;
};
