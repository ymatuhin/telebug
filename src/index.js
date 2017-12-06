const consolePatch = require('./consolePatch').default;

const unhandleSubscribe = IS_BROWSER
  ? require('./unhandle.browser').default
  : require('./unhandle.node').default;

const httpPost = IS_BROWSER
  ? require('./http.post.browser').default
  : require('./http.post.node').default;

class errorsToTelegram {
  constructor(config) {
    this.inited = false;
    this.botId = null;
    this.chatId = null;
  }

  init(config = {}) {
    if (this.inited) throw new Error('errorsToTelegram already inited');
    if (!config.botId) throw new Error('botId must be provided');
    if (!config.chatId) throw new Error('chatId must be provided');
    this.botId = config.botId;
    this.chatId = config.chatId;
    this.inited = true;

    unhandleSubscribe(this.handleError.bind(this));
    consolePatch(this.handleConsole.bind(this));
  }

  handleError(error) {
    const message = this.createErrorMessage(error);
    this.sendMessage(message);
  }

  handleConsole(...args) {
    const message = this.createConsoleMessage(...args);
    this.sendMessage(message);
  }

  getCommonInfo() {
    let md = `*==${IS_BROWSER ? 'browser' : 'server'}==*`;
    md += IS_BROWSER ? `\n*Url* ${location.href}` : '';
    md += IS_BROWSER ? `\n*UserAgent* ${navigator.userAgent}` : '';
    return md;
  }

  createConsoleMessage(type, ...args) {
    let md = this.getCommonInfo();
    md += args.length ? `\n*Console.${type}*: \`${args.join(', ')}\`` : '';
    return md;
  }

  createErrorMessage(error) {
    let md = this.getCommonInfo();

    if (typeof error === 'object') {
      const message = error.message || error.error;
      const stack = error.stack || error.error.stack;
      const file = error.filename
        ? `${error.filename}:${error.lineno}:${error.colno}`
        : '';
      md += message ? `\n*Message* ${message}` : '';
      md += file ? `\n*File* ${file}` : '';
      md += stack ? `\n\`${stack}\`` : '';
    } else {
      md += message ? `\n*Message* ${error}\n` : '';
    }
    return md;
  }

  sendMessage(text) {
    const url = `https://api.telegram.org/bot${this.botId}/sendMessage`;
    httpPost(url, {
      chat_id: this.chatId,
      parse_mode: 'markdown',
      text,
    });
  }
}
module.exports = new errorsToTelegram();
