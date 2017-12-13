const telebug = require('./dist/index.js');

const config = {
  botId: '474186924:AAGtoPx1A_q9MoLdhRCin5EmGwN7xlC_21g',
  chatId: '@ymatuhins_projects_errors',
};

const bugInstance = telebug(config);
bugInstance.addCustomMessage(`From demo node.js`);
// telebug(config);

qwerty();
