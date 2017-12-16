import { validateParam, errorFactory } from './utils';
import Telebug from './telebug';

module.exports = function telebug(config = {}) {
  if (telebug.inited) throw errorFactory('Telebug is already inited');
  validateParam('config', config, Object, true);
  validateParam('botId', config.botId, String, true);
  validateParam('chatId', config.chatId, String, true);

  validateParam('activeHosts', config.activeHosts, Array);
  validateParam('customMessages', config.customMessages, Array);
  validateParam('disableCorsMessage', config.disableCorsMessage, Boolean);

  telebug.inited = true;
  telebug.version = process.env.VERSION;

  return new Telebug(config);
};
