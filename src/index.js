import validateConfig from './utils/validateConfig';
import sendHtmlToTelegram from './utils/sendHtmlToTelegram';

function telebug(config = {}) {
  validateConfig(config);
  const { chatId, botId } = config;
  const publicApi = {};
  const customInfo = config.customInfo || {};

  publicApi.version = process.env.VERSION;
  publicApi.addCustomInfo = newInfo => Object.assign(customInfo, newInfo);
  publicApi.sendMessage = html => sendHtmlToTelegram(chatId, botId, html);

  telebug.inited = true;
  return publicApi;
}

module.exports = telebug;
