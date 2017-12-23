const escape = require('lodash.escape');

export default info => {
  let md = ``;
  if (info.file) md += `\nFile: ${escape(info.file)}`;
  if (info.message) {
    const message = escape(info.message);
    if (info.name) md += `\n<code>${info.name}: ${message}</code>`;
    else md += `\nMessage: <code>${message}</code>`;
  }
  if (info.reason) md += `\nReason: <code>${escape(info.reason)}</code>`;
  if (info.errorCode) md += `\nError code: ${escape(info.errorCode)}`;
  if (info.facilityCode) md += `\Facility code: ${escape(info.facilityCode)}`;
  if (info.stack) md += `\n<pre>${escape(info.stack)}</pre>`;
  return md;
};
