const process = require('process');

export default fn => {
  process.on('uncaughtException', fn);
  process.on('unhandledRejection', fn);
};
