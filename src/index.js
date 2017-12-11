const consolePatch = require('./consolePatch').default;
const unhandleSubscribe = IS_BROWSER
  ? require('./unhandle.browser').default
  : require('./unhandle.node').default;

const httpPost = IS_BROWSER
  ? require('./http.post.browser').default
  : require('./http.post.node').default;

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const telebug = (function() {
  let inited = false;

  return function(config = {}) {
    if (!config.chatId) throw new Error('chatId must be provided');
    if (inited) throw new Error('Telebug already inited');
    inited = true;

    const defaultBotId = '474186924:AAGtoPx1A_q9MoLdhRCin5EmGwN7xlC_21g';
    const botId = config.botId || defaultBotId;
    const chatId = config.chatId;
    const corsEnabled = Boolean(config.cors) || false;
    const apiUrl = `https://api.telegram.org/bot${botId}`;
    const customMessages = config.customMessage ? [config.customMessage] : [];

    unhandleSubscribe(compose(sendMessage, createErrorMessage));
    consolePatch(compose(sendMessage, createConsoleMessage));

    function createConsoleMessage(type, ...args) {
      let md = getCommonInfo();
      md += args.length ? `\n\`console.${type}(${args.join(', ')})\`` : '';
      return md;
    }

    function createErrorMessage(error) {
      const isCorsError = error.message === 'Script error.';
      let md = getCommonInfo();

      if (typeof error === 'object') {
        if (!corsEnabled && isCorsError) return;

        const corsError = `Error in script from another domain. You should add \`crossorigin="anonymous"\` attribute to the script tag or set \`Access-Control-Allow-Origin\` header on the server.`;
        if (isCorsError) md += `\n${corsError}`;
        else if (error.message) md += `\n${error.message}`;

        const pos = `${error.lineno}:${error.colno}`;
        if (error.filename) md += `\n${error.filename}:${pos}`;

        if (error.error && error.error.stack)
          md += `\n\`${error.error.stack}\``;
        else if (error.stack) md += `\n\`${error.stack}\``;
      } else {
        md += `\n${JSON.stringify(error)}`;
      }

      return md;
    }

    function getCommonInfo() {
      let md = '';

      if (IS_BROWSER) {
        md += `\n${location.href}`;
        md += `\n${navigator.userAgent}`;
      } else {
        md += `Node.js v${process.versions.v8}`;
      }

      customMessages.forEach(msg => (md += `\n${msg}`));
      return md;
    }

    function sendMessage(text) {
      if (!text) return;
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
