const getErrorInfo = require('./getErrorInfo.js').default;
const { corsError } = require('../config.js');

test('getErrorInfo', () => {
  const fn = () => {};
  const error = new Error('demo error');
  const errorEvent = new ErrorEvent(error);

  expect(getErrorInfo()).toEqual({ message: undefined });
  expect(getErrorInfo(null)).toEqual({ message: 'null' });
  expect(getErrorInfo(NaN)).toEqual({ message: 'null' });
  expect(getErrorInfo(true)).toEqual({ message: 'true' });
  expect(getErrorInfo(false)).toEqual({ message: 'false' });
  expect(getErrorInfo([])).toEqual({ message: '[]' });
  expect(getErrorInfo([1, 2, 3])).toEqual({ message: '[1,2,3]' });

  expect(getErrorInfo(fn)).toEqual({ message: undefined });
  expect(getErrorInfo(error).message).toMatchSnapshot();
  expect(getErrorInfo(error).message).toBeTruthy();
  expect(getErrorInfo(error).stack).toBeTruthy();

  expect(getErrorInfo(errorEvent).message).toMatchSnapshot();
  expect(getErrorInfo(errorEvent).message).toBeTruthy();

  expect(getErrorInfo({ message: 'Script error' }).message).toBe(corsError);
  expect(getErrorInfo({ message: 'Script error.' }).message).toBe(corsError);

  expect(
    getErrorInfo({ filename: 'demo.html', lineno: 1, colno: 2 }).file,
  ).toBe('demo.html:1:2');
});
