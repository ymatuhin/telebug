export default fn => {
  if (typeof fn !== 'function')
    throw new Error('consolePatch: fn must be a function');

  const methods = ['error', 'exception', 'warn'];
  var console = global.console || window.console || {};
  methods.forEach(method => {
    console[method] = (...args) => fn(method, ...args);
  });
};
