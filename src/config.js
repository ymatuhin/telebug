export const initedError = `❗️ Error: telebug already inited`;
export const corsError =
  'Error in script from another domain. You should add <code>crossorigin="anonymous"</code> attribute to the script tag or set <code>Access-Control-Allow-Origin</code> header on the server.';

export const provideField = fieldName =>
  `❗️ Error: ${fieldName} must be provided`;

export const apiUrl = botId =>
  `https://api.telegram.org/bot${botId}/sendMessage`;
