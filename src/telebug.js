import { corsError } from './config';
import {
  unhandledBrowserError,
  unhandledNodeError,
  unhandledPromise,
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

    if (process.env.BROWSER) {
      const currentHost = location.hostname || location.host;
      const hostsDefined = activeHosts && activeHosts.length;
      if (hostsDefined && activeHosts.indexOf(currentHost) === -1) return;
    }

    this.init();
  }

  init() {
    unhandledNodeError(this.onNodeError.bind(this));
    unhandledBrowserError(this.onBrowserError.bind(this));
    unhandledPromise(this.onPromiseReject.bind(this));
    consolePatch(this.onConsole.bind(this));
  }

  onNodeError(error = {}) {
    const info = {};
    if (error.message) info.message = error.message;
    if (error.stack) info.stack = error.stack;
    this.beforeSend(info);
  }

  onBrowserError(message, filename, lineno, colno, error) {
    const info = {};
    info.message = error && error.message ? error.message : message;
    if (filename) info.filename = `${filename}:${lineno}:${colno}`;
    if (error && error.stack) info.stack = error.stack;
    this.beforeSend(info);
  }

  onPromiseReject(error = {}) {
    const info = {};
    info.message = 'Unhadled promise rejection';
    info.reason = error.reason;
    if (error.stack) info.stack = error.stack;
    this.beforeSend(info);
  }

  onConsole(type, ...args) {
    const info = { console: type, consoleData: args };
    this.beforeSend(info);
  }

  beforeSend(errorInfo) {
    const isCors = /^Script error\.?$/.test(errorInfo.message);
    if (this.disableCorsMessage && isCors) return;
    if (isCors) errorInfo.message = corsError;

    if (process.env.DEV) console.info(`# errorInfo`, errorInfo);

    const commonHtml = getCommonInfo(this.customMessages);
    const errorHtml = createErrorMessage(errorInfo);
    this.sendMessage(`${commonHtml}${errorHtml}`);
  }

  sendMessage(text) {
    if (process.env.DEV) {
      console.info(`# send to telegram\n`, text);
      return;
    }

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
