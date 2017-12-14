import isObject from './isObject';
const { corsError } = require('./config.js');

export default function getErrorInfo(error) {
  if (isObject(error)) {
    const isCors = /^Script error\.?$/;
    const info = {};
    const hasErrorObj = error.error && error.error.message;

    if (hasErrorObj) info.message = error.error.message;
    if (!info.message) info.message = error.message || error.type;
    if (!info.message) info.message = error.toString();

    if (isCors.test(info.message)) info.message = corsError;

    if (error.filename)
      info.file = `${error.filename}:${error.lineno}:${error.colno}`;

    if (error.stack) info.stack = error.stack;
    else if (error.error && error.error.stack) info.stack = error.error.stack;

    return info;
  } else {
    return { message: JSON.stringify(error) };
  }
}
