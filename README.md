# Telebug

Tools for logging your production errors to telegram channel.

## Init

Minimal configuration is:

```js
telebug({
  botId: 'bot_id',
  chatId: '@channelname',
});
```

## Configuration properties

`botId` — (string) bot id
`chatId` — (string) chat id (like @something)
`hosts` — (Array:string) accepted host from you want to recive messages
`disableCorsMessage` (Boolean) — disable message about error inside external cross origin script
`customMessage` — (string) any information you want to add to messages (can be `html`)
