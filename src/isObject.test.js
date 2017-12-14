import isObject from './isObject.js';

test('isObject', () => {
  const obj1 = {};
  const obj2 = new Object();
  const obj3 = new Error('Test');
  const obj4 = new ErrorEvent(obj3);

  expect(isObject()).toBeFalsy();
  expect(isObject(null)).toBeFalsy();
  expect(isObject('123')).toBeFalsy();
  expect(isObject(() => {})).toBeFalsy();
  expect(isObject(null)).toBeFalsy();
  expect(isObject(NaN)).toBeFalsy();
  expect(isObject(Infinity)).toBeFalsy();
  expect(isObject(10)).toBeFalsy();
  expect(isObject(10)).toBeFalsy();
  expect(isObject([])).toBeFalsy();

  expect(isObject(obj1)).toBeTruthy();
  expect(isObject(obj2)).toBeTruthy();
  expect(isObject(obj3)).toBeTruthy();
  expect(isObject(obj4)).toBeTruthy();
});
