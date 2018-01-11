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
  constructor(config) {
    this.config = config;
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

    const commonHtml = getCommonInfo();
    const errorHtml = createErrorMessage(errorInfo);
    this.sendMessage(`${commonHtml}${errorHtml}`);
  }

  sendMessage(text) {
    if (process.env.DEV) {
      console.info(`# send to telegram\n`, text);
      return;
    }

    const params = {
      chat_id: this.config.chatId,
      disable_web_page_preview: true,
      parse_mode: 'html',
      text,
    };

    const url = `https://api.telegram.org/bot${this.config.botId}/sendMessage`;
    httpPost(url, params);
  }
}
