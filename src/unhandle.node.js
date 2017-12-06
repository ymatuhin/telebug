const process = require('process');

export default fn => {
  if (typeof fn !== 'function')
    throw new Error('unhandle: fn must be a function');

  process.on('uncaughtException', fn);
  process.on('unhandledRejection', fn);
};
