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

const telebug = (function() {
  let inited = false;

  return function(config = {}) {
    if (!config.chatId) throw new Error('chatId must be provided');
    if (inited) throw new Error('Telebug already inited');
    inited = true;

    const defaultBotId = '474186924:AAGtoPx1A_q9MoLdhRCin5EmGwN7xlC_21g';
    const botId = config.botId || defaultBotId;
    const chatId = config.chatId;
    const apiUrl = `https://api.telegram.org/bot${botId}`;
    const customMessages = config.customMessage ? [config.customMessage] : [];

    unhandleSubscribe(handleError);
    consolePatch(handleConsole);

    function handleError(error) {
      const message = createErrorMessage(error);
      handleErrorMessage(message);
    }

    function handleConsole(...args) {
      const message = createConsoleMessage(...args);
      handleErrorMessage(message);
    }

    function handleErrorMessage(message) {
      if (IS_BROWSER) {
        if (!window.html2canvas) return;
        const onPhotoSent = () => sendMessage(message);
        makeScreenShot(blob => sendPhoto(blob, onPhotoSent));
      } else sendMessage(message);
    }

    function createConsoleMessage(type, ...args) {
      let md = getCommonInfo();
      md += args.length ? `\n\`console.${type}(${args.join(', ')})\`` : '';
      return md;
    }

    function createErrorMessage(error) {
      let md = getCommonInfo();

      if (typeof error === 'object') {
        const originalError = error.error || error;
        if (originalError.stack) md += `\n\`${originalError.stack}\``;
        else md += `\n\`${originalError.message}\``;
      } else {
        md += '\n' + error;
      }

      return md;
    }

    function getCommonInfo() {
      let md = `*${IS_BROWSER ? 'browser' : 'server'}*`;
      md += IS_BROWSER ? `\n${location.href}` : '';
      md += IS_BROWSER ? `\n${navigator.userAgent}` : '';
      customMessages.forEach(msg => (md += `\n${msg}`));
      return md;
    }

    function makeScreenShot(cb) {
      const promise = html2canvas(document.body);
      promise.then(canvas => {
        canvas.toBlob(cb, 'image/jpeg', 0.7);
      });
    }

    function sendPhoto(blob, cb) {
      const url = `${apiUrl}/sendPhoto`;
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('photo', blob);
      httpFormData(url, formData, cb);
    }

    function sendMessage(text) {
      const url = `${apiUrl}/sendMessage`;
      httpPost(url, {
        chat_id: chatId,
        disable_web_page_preview: true,
        parse_mode: 'markdown',
        text,
      });
    }

    function addCustomMessage(message) {
      customMessages.push(message);
    }

    return {
      sendMessage,
      sendPhoto,
      addCustomMessage,
    };
  };
})();

module.exports = telebug;
