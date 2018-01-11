import { isNode } from './env';

const hostValidate = (hosts: mixed) => {
  if (isNode) return;
  if (!(hosts instanceof Array)) return;
  if (hosts.length === 0) return;

  const host = location.hostname || location.host;
  const invalid = hosts.indexOf(host) === -1;

  if (invalid)
    throw new Error(
      `Current address is disallowed, check "hosts" parameter in config`,
    );
};

export default (inited: boolean, config: Object) => {
  if (inited) throw new Error('Telebug is already inited');
  if (typeof config !== 'object') throw new Error(`"config" must be an object`);
  if (typeof config.botId !== 'string')
    throw new Error(`"botId" must be a string`);
  if (typeof config.chatId !== 'string')
    throw new Error(`"chatId" must be a string`);

  if (typeof config.cors !== 'undefined' && typeof config.cors !== 'boolean')
    throw new Error(`"cors" must be a boolean`);
  if (typeof config.hosts !== 'undefined' && !(config.hosts instanceof Array))
    throw new Error(`"hosts" must be an array`);

  hostValidate(config.hosts);
};
