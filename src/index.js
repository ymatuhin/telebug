const consolePatch = require('./consolePatch').default;

const unhandleSubscribe = IS_BROWSER
  ? require('./unhandle.browser').default
  : require('./unhandle.node').default;

const httpPost = IS_BROWSER
  ? require('./http.post.browser').default
  : require('./http.post.node').default;

const httpFormData = IS_BROWSER
  ? require('./http.formData.browser').default
  : null;

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
    this.apiUrl = `https://api.telegram.org/bot${this.botId}`;
    this.inited = true;

    unhandleSubscribe(this.handleError.bind(this));
    consolePatch(this.handleConsole.bind(this));
  }

  handleError(error) {
    const message = this.createErrorMessage(error);
    this.handleErrorMessage(message);
  }

  handleConsole(...args) {
    const message = this.createConsoleMessage(...args);
    this.handleErrorMessage(message);
  }

  handleErrorMessage(message) {
    if (IS_BROWSER) {
      if (!window.html2canvas) return;
      const onPhotoSent = () => this.sendMessage(message);
      this.makeScreenShot(blob => this.sendPhoto(blob, onPhotoSent));
    } else this.sendMessage(message);
  }

  getCommonInfo() {
    let md = `*${IS_BROWSER ? 'browser' : 'server'}*`;
    md += IS_BROWSER ? `\n${location.href}` : '';
    md += IS_BROWSER ? `\n${navigator.userAgent}` : '';
    return md;
  }

  createConsoleMessage(type, ...args) {
    let md = this.getCommonInfo();
    md += args.length ? `\n\`console.${type}(${args.join(', ')})\`` : '';
    return md;
  }

  createErrorMessage(error) {
    let md = this.getCommonInfo();

    if (typeof error === 'object') {
      const originalError = error.error || error;
      if (originalError.stack) md += `\n\`${originalError.stack}\``;
      else md += `\n\`${originalError.message}\``;
    } else {
      md += '\n' + error;
    }

    return md;
  }

  makeScreenShot(cb) {
    const promise = html2canvas(document.body);
    promise.then(canvas => {
      canvas.toBlob(cb, 'image/jpeg', 0.7);
    });
  }

  sendPhoto(blob, cb) {
    const url = `${this.apiUrl}/sendPhoto`;
    const formData = new FormData();
    formData.append('chat_id', this.chatId);
    formData.append('photo', blob);
    httpFormData(url, formData, cb);
  }

  sendMessage(text) {
    const url = `${this.apiUrl}/sendMessage`;
    httpPost(url, {
      chat_id: this.chatId,
      disable_web_page_preview: true,
      parse_mode: 'markdown',
      text,
    });
  }
}

module.exports = new errorsToTelegram();
