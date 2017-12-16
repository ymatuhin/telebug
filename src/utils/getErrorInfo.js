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
    const name = getErrorProperty(error, 'name');
    if (name) info.name = name;

    const message =
      getErrorProperty(error, 'message') ||
      getErrorProperty(error, 'description') ||
      error.toString();

    const isCors = /^Script error\.?$/.test(message);
    info.message = isCors ? corsError : message;

    const filename = getErrorProperty(error, 'filename');
    const lineno = getErrorProperty(error, 'lineno');
    const colno = getErrorProperty(error, 'colno');
    if (filename) info.file = `${filename}:${lineno}:${colno}`;

    const stack = getErrorProperty(error, 'stack');
    if (stack) info.stack = stack;

    if (typeof error.toSource === 'function') info.source = error.toSource();
    if (typeof error.number === 'number') {
      info.errorCode = error.number & 0xffff;
      info.facilityCode = (error.number >> 16) & 0x1fff;
    }
  } else {
    info.message = JSON.stringify(error);
  }
  return info;
};
