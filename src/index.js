// @flow

import { isBrowser } from './utils/env';
import onError from '@ymatuhin/onerror';
import watchUser from '@ymatuhin/watchuser';
import validateConfig from './utils/validateConfig';
import sendHtmlToTelegram from './utils/sendHtmlToTelegram';
import errorToHtml from './utils/errorToHtml';

function telebug(config = {}) {
  validateConfig(telebug.inited, config);
  const { chatId, botId, cors } = config;
  const customInfo = config.customInfo || {};
  const publicApi = {};

  publicApi.addCustomInfo = newInfo => Object.assign(customInfo, newInfo);
  publicApi.sendMessage = html => sendHtmlToTelegram(chatId, botId, html);

  if (isBrowser) watchUser.start();
  onError(error => {
    const lastEvents = watchUser.getEvents().slice(0, 10);
    const eventsList = lastEvents.map(event => event.toString()).join('\n    ');
    if (eventsList) error.events = `Latest events\n    ${eventsList}`;

    if (!cors) {
      const isCors = error.message.toLowerCase().indexOf('script error') === 0;
      if (isCors) return;
    }

    publicApi.sendMessage(errorToHtml(error));
  });

  telebug.version = process.env.VERSION;
  telebug.inited = true;
  return publicApi;
}

module.exports = telebug;
