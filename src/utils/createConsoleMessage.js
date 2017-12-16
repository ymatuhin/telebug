const escape = require('lodash.escape');

export default (type, ...args) => {
  if (!type) return;
  if (args.length) {
    const msg = args.reduce((acc, val, index) => {
      const comma = index === 0 ? '' : ', ';
      return acc + comma + JSON.stringify(val);
    }, '');
    return `\n<pre>console.${type}(${msg})</pre>`;
  }
};
