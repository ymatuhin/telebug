const escape = require('lodash.escape');

export default info => {
  let html = ``;
  if (info.file) html += `\nFile: ${escape(info.file)}`;
  if (info.message) {
    const message = escape(info.message);
    if (info.name) html += `\n<code>${info.name}: ${message}</code>`;
    else html += `\nMessage: <code>${message}</code>`;
  }
  if (info.reason) html += `\nReason: <code>${escape(info.reason)}</code>`;
  if (info.stack) html += `\n<pre>${escape(info.stack)}</pre>`;

  if (info.console) {
    const msg = (info.consoleData || []).reduce((acc, val, index) => {
      const comma = index === 0 ? '' : ', ';
      return acc + comma + JSON.stringify(val);
    }, '');
    html += `\n<pre>console.${info.console}(${msg})</pre>`;
  }
  return html;
};
