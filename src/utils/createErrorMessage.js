const escape = require('lodash.escape');

export default info => {
  let html = ``;
  if (info.file) html += `\nFile: ${escape(info.file)}`;
  const noMsgInStack =
    info.stack && info.message && info.stack.indexOf(info.message) === -1;
  if (noMsgInStack) html += `\nMessage: <code>${escape(info.message)}</code>`;
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
