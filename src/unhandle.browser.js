export default fn => {
  if (typeof fn !== 'function')
    throw new Error('unhandle: fn must me a function');
  window.addEventListener('error', fn);
  window.addEventListener('unhandledrejection', fn);
};
