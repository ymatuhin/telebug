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

`botId` — (String) bot id <mark>required</mark>
`chatId` — (String) chat id (looks like @something) <mark>required</mark>
`activeHosts` — (Array<string>) accepted host from you want to recive messages
`disableCorsMessage` (Boolean) — disable message about error inside external cross origin script
`customMessages` — (Array<string>) any information you want to add to messages (can be `html`)
