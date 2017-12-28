export default fn => {
  if (process.env.BROWSER) {
    window.addEventListener('unhandledrejection', fn);
  } else {
    const process = require('process');
    process.on('unhandledRejection', fn);
  }
};
