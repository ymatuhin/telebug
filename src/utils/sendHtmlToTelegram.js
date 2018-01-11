import { isBrowser } from './env';

const httpPost = isBrowser
  ? require('./http.post.browser').default
  : require('./http.post.node').default;

export default (chatId: string, botId: string, html: string) => {
  const params = {
    chat_id: chatId,
    disable_web_page_preview: true,
    parse_mode: 'html',
    text: html,
  };

  const url = `https://api.telegram.org/bot${botId}/sendMessage`;
  httpPost(url, params);
};
