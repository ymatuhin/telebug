const telebug = require('./index.js');

test('throw errors on init', () => {
  const chatId = '123';
  const botId = '123';

  expect(() => telebug()).toThrowErrorMatchingSnapshot();
  expect(() => telebug({ chatId })).toThrowErrorMatchingSnapshot();
  expect(() => telebug({ botId })).toThrowErrorMatchingSnapshot();

  expect(() => {
    telebug({ chatId, botId });
    telebug({ chatId, botId });
  }).toThrowErrorMatchingSnapshot();
});
