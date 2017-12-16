const telebug = require('../dist/index.js').default;

const config = {
  botId: '474186924:AAGtoPx1A_q9MoLdhRCin5EmGwN7xlC_21g',
  chatId: '@telebug_development',
};

const bugInstance = telebug(config);
bugInstance.addCustomMessage(`From demo node.js`);

qwerty();
