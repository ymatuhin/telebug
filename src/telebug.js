import { corsError } from './config';
import {
  unhandled,
  consolePatch,
  getCommonInfo,
  getErrorInfo,
  createConsoleMessage,
  createErrorMessage,
  httpPost,
  validateParam,
} from './utils';

export default class Telebug {
  constructor({
    botId,
    chatId,
    activeHosts,
    customMessages,
    disableCorsMessage,
  }) {
    this.botId = botId;
    this.chatId = chatId;
    this.customMessages = customMessages || [];
    this.disableCorsMessage = disableCorsMessage;
    this.apiUrl = `https://api.telegram.org/bot${botId}/sendMessage`;

    const currentHost = location.hostname || location.host;
    const hostsDefined = activeHosts && activeHosts.length;
    if (hostsDefined && activeHosts.indexOf(currentHost) === -1) return;
    this.init();
  }

  init() {
    unhandled(this.onUnhandled.bind(this));
    consolePatch(this.onConsole.bind(this));
  }

  preventSend(markdown, errorInfo) {
    if (!markdown.length) return true;

    if (errorInfo && this.disableCorsMessage && errorInfo.message === corsError)
      return true;

    return false;
  }

  onUnhandled(error) {
    const commonMd = getCommonInfo(this.customMessages);
    const errorInfo = getErrorInfo(error);
    const errorMd = createErrorMessage(errorInfo);

    if (this.preventSend(errorMd, errorInfo)) return;
    this.sendMessage(`${commonMd}${errorMd}`);
  }

  onConsole(type, ...args) {
    const commonMd = getCommonInfo(this.customMessages);
    const consoleMd = createConsoleMessage(type, ...args);

    if (this.preventSend(consoleMd)) return;
    this.sendMessage(`${commonMd}${consoleMd}`);
  }

  sendMessage(text) {
    httpPost(this.apiUrl, {
      chat_id: this.chatId,
      disable_web_page_preview: true,
      parse_mode: 'html',
      text,
    });
  }

  addCustomMessage(message) {
    if (typeof message !== 'string') return;
    this.customMessages.push(message);
  }
}
