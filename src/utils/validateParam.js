import errorFactory from './errorFactory';
import getConstrutorName from './getConstrutorName';

export default (name, value, type, required) => {
  if (!required && value === undefined) return;
  if (required && value === undefined)
    throw errorFactory(`Property “${name}” is required`);

  const valueType = getConstrutorName(value);
  if (valueType === type.name) return;

  const isAn = /^[AEIOUY].*/.test(type.name);
  const aricle = isAn ? 'an' : 'a';

  throw errorFactory(
    `The “${name}” property must be ${aricle} ${
      type.name
    }, but recieved ${valueType}`,
  );
};
