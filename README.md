# Telebug

Tools for logging your production errors from Node.js or browser to your telegram channel.

## Init

Minimal configuration is:

```js
telebug({
  botId: 'bot_id',
  chatId: '@channel_name',
});
```

## Options

* `botId` (String) — your bot id, it's required field
* `chatId` (String) — chat id, it's required field
* `hosts` (Array<string>) — accepted host from you want to recive messages, `[]` by default
* `cors` (Boolean) — disable message about error inside external cross origin script, `false` by default
* `customInfo` (Object) — (browser only) this info adds to every error notification

For example

```js
telebug({
  botId: 'bot_id',
  chatId: '@channel_name',
  hosts: ['ymatuhin.ru', 'ymatuhin.net'],
  cors: true,
  customInfo: {
    userId: 1,
    userName: 'Yury',
  },
});
```
