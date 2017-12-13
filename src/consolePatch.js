export default fn => {
  if (typeof fn !== 'function')
    throw new Error('consolePatch: fn must be a function');

  const methods = [
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'markTimeline',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn',
  ];
  var console = global.console || window.console || {};
  methods.forEach(method => {
    console[method] = (...args) => fn(method, ...args);
  });
};
