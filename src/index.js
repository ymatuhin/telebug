const { provideField, initedError, apiUrl } = require('./config.js');
const consolePatch = require('./consolePatch').default;

const {
  createConsoleMessage,
  createErrorMessage,
} = require('./createMessages.js');

const unhandleSubscribe = process.env.BROWSER
  ? require('./unhandle.browser').default
  : require('./unhandle.node').default;

const getCommonInfo = process.env.BROWSER
  ? require('./getCommonInfo.browser').default
  : require('./getCommonInfo.node').default;

const httpPost = process.env.BROWSER
  ? require('./http.post.browser').default
  : require('./http.post.node').default;

const telebug = (function() {
  let inited = false;

  return function(config = {}) {
    if (!config.botId) throw new Error(provideField('botId'));
    if (!config.chatId) throw new Error(provideField('chatId'));
    if (inited) throw new Error(initedError);
    inited = true;

    const hosts = config.hosts || [];
    const notMyHosts = () => hosts.indexOf(location.hostname) !== -1;
    const corsEnabled = !config.disableCorsMessage || true;
    const customMessages = config.customMessage ? [config.customMessage] : [];

    unhandleSubscribe(error => {
      const commonInfo = getCommonInfo(customMessages);
      const errorInfo = createErrorMessage(error);

      if (process.env.BROWSER && hosts.length && notMyHosts()) return;
      if (errorInfo) sendMessage(commonInfo + errorInfo);
    });

    consolePatch((type, ...args) => {
      const commonInfo = getCommonInfo(customMessages);
      const consoleInfo = createConsoleMessage(type, ...args);

      if (process.env.BROWSER && hosts.length && notMyHosts()) return;
      if (consoleInfo) sendMessage(commonInfo + consoleInfo);
    });

    function sendMessage(text) {
      httpPost(apiUrl(config.botId), {
        chat_id: config.chatId,
        disable_web_page_preview: true,
        parse_mode: 'html',
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
