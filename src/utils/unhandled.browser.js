export default fn => {
  window.addEventListener('error', fn);
  window.addEventListener('unhandledrejection', fn);
};
