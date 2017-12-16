const telebug = require('../dist/index.js');

const config = {
  botId: '474186924:AAGtoPx1A_q9MoLdhRCin5EmGwN7xlC_21g',
  chatId: '@telebug_development',
};

const bugInstance = telebug(config);
bugInstance.addCustomMessage(`From demo node.js`);

setTimeout(() => qwerty(), 100);
setTimeout(Promise.reject(new Error('woops')), 200);

// syntax error
eval('hoo bar');
