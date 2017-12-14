export const initedError = `❗️ Error: telebug already inited`;
export const corsError =
  'Error in script from another domain. You should add `crossorigin="anonymous"` attribute to the script tag or set `Access-Control-Allow-Origin` header on the server.';

export const provideField = fieldName =>
  `❗️ Error: ${fieldName} must be provided`;

export const apiUrl = botId =>
  `https://api.telegram.org/bot${botId}/sendMessage`;
