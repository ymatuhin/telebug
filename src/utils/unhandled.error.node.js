export default fn => {
  if (!process.env.BROWSER) {
    const process = require('process');
    process.on('uncaughtException', fn);
  }
};
