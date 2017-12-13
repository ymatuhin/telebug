const upParser = IS_BROWSER ? require('ua-parser-js') : () => {};
const consolePatch = require('./consolePatch').default;
const unhandleSubscribe = IS_BROWSER
  ? require('./unhandle.browser').default
  : require('./unhandle.node').default;

const httpPost = IS_BROWSER
  ? require('./http.post.browser').default
  : require('./http.post.node').default;

const telebug = (function() {
  const corsErrorText = `Error in script from another domain. You should add \`crossorigin="anonymous"\` attribute to the script tag or set \`Access-Control-Allow-Origin\` header on the server.`;
  let inited = false;

  return function(config = {}) {
    if (!config.chatId) throw new Error('chatId must be provided');
    if (inited) throw new Error('Telebug already inited');
    inited = true;

    const defaultBotId = '474186924:AAGtoPx1A_q9MoLdhRCin5EmGwN7xlC_21g';
    const botId = config.botId || defaultBotId;
    const chatId = config.chatId;
    const corsEnabled = Boolean(config.cors) || true;
    const apiUrl = `https://api.telegram.org/bot${botId}`;
    const customMessages = config.customMessage ? [config.customMessage] : [];

    unhandleSubscribe(onError);
    consolePatch(onConsole);

    function onError(error) {
      const commonInfo = getCommonInfo();
      const errorInfo = createErrorMessage(error);
      if (errorInfo) sendMessage(commonInfo + errorInfo);
    }

    function onConsole(type, ...args) {
      const commonInfo = getCommonInfo();
      const consoleInfo = createConsoleMessage(type, ...args);
      if (consoleInfo) sendMessage(commonInfo + consoleInfo);
    }

    function createConsoleMessage(type, ...args) {
      if (!type) return;
      if (args.length) {
        const msg = args.reduce((acc, val, index) => {
          const comma = index === 0 ? '' : ', ';
          return acc + comma + JSON.stringify(val);
        }, '');
        return `\n\`console.${type}(${msg})\``;
      }
    }

    function createErrorMessage(error) {
      const info = getErrorInfo(error);
      if (!info.file && !info.message && !info.stack) return;
      let md = ``;

      if (info.file) md += `\n${info.file}`;
      if (info.message) md += `\n${info.message}`;
      if (info.stack) md += `\n\`${info.stack}\``;
      return md;
    }

    function getErrorInfo(error) {
      const info = {};

      if (error.message) info.message = error.message;
      else if (error.error && error.error.message)
        info.message = error.error.message;
      else info.message = JSON.stringify(error);

      if (info.message === 'Script error.') info.message = corsErrorText;

      if (error.filename)
        info.file = `${error.filename}:${error.lineno}:${error.colno}`;

      if (error.stack) info.stack = error.stack;
      else if (error.error && error.error.stack) info.stack = error.error.stack;

      return info;
    }

    function getCommonInfo() {
      let md = '';

      if (IS_BROWSER) {
        const ua = upParser(navigator.userAgent);
        const majorVersion = (ua.browser.version || '').split('.')[0];
        if (ua.browser.name && ua.os.name) {
          const browser = ua.browser.name
            ? `${ua.browser.name} ${majorVersion}`
            : '';
          const os = ua.os.name ? `${ua.os.name} ${ua.os.version || ''}` : '';
          md += `\*Browser* ${browser} on ${os}`;
        }
        md += `\n${location.href}`;
      } else {
        md += `*Node* ${process.versions.v8}`;
      }

      customMessages.forEach(msg => (md += `\n${msg}`));
      return md;
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
      addCustomMessage,
    };
  };
})();

module.exports = telebug;
