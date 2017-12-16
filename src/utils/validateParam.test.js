import validateParam from './validateParam';

test('validateParam', () => {
  expect(validateParam('String', '123', String)).toBeUndefined();
  expect(validateParam('Number', 1, Number)).toBeUndefined();
  expect(validateParam('Object', {}, Object)).toBeUndefined();
  expect(validateParam('Array', [], Array)).toBeUndefined();

  expect(() => validateParam(validateParam('String', 1, String))).toThrow();
  expect(() => validateParam(validateParam('String', 'qwe', Number))).toThrow();
  expect(() => validateParam(validateParam('String', {}, Array))).toThrow();
  expect(() => validateParam(validateParam('String', [], Object))).toThrow();
});
