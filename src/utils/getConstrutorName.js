import upcaseFirst from './upcaseFirst';

export default value =>
  value && value.constructor
    ? value.constructor.name
    : upcaseFirst(typeof value);
