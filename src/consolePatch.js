export default fn => {
  if (typeof fn !== 'function')
    throw new Error('consolePatch: fn must be a function');

  const originalWarn = console.warn.bind(console);
  const originalError = console.error.bind(console);

  console.warn = (...args) => {
    fn('warn', ...args), originalWarn(...args);
  };
  console.error = (...args) => {
    fn('error', ...args), originalError(...args);
  };
};
