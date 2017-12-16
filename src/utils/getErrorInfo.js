import isObject from './isObject';
import { corsError } from '../config';

const getErrorProperty = (error, property) => {
  if (error.error && error.error[property]) return error.error[property];
  if (error.reason && error.reason[property]) return error.reason[property];
  if (error[property]) return error[property];
};

export default error => {
  const info = {};

  if (isObject(error)) {
    const message = getErrorProperty(error, 'message') || error.toString();
    const isCors = /^Script error\.?$/.test(message);
    info.message = isCors ? corsError : message;

    const filename = getErrorProperty(error, 'filename');
    const lineno = getErrorProperty(error, 'lineno');
    const colno = getErrorProperty(error, 'colno');
    if (filename) info.file = `${filename}:${lineno}:${colno}`;

    const stack = getErrorProperty(error, 'stack');
    if (stack) info.stack = stack;
  } else {
    info.message = JSON.stringify(error);
  }
  return info;
};
