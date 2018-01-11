import { isNode } from './env';
import errorFactory from './errorFactory';

const hostValidate = (hosts: mixed) => {
  if (isNode) return;
  if (!(hosts instanceof Array)) return;
  if (hosts.length === 0) return;

  const host = location.hostname || location.host;
  const invalid = hosts.indexOf(host) !== -1;

  if (invalid)
    throw errorFactory(
      `Current address is disallowed, check "hosts" parameter in config`,
    );
};

export default (inited: boolean, config: Object) => {
  if (inited) throw errorFactory('Telebug is already inited');
  if (typeof config !== 'object')
    throw errorFactory(`"config" must be an object`);
  if (typeof config.botId !== 'string')
    throw errorFactory(`"botId" must be a string`);
  if (typeof config.chatId !== 'string')
    throw errorFactory(`"chatId" must be a string`);

  if (typeof config.cors !== 'undefined' && typeof config.cors !== 'boolean')
    throw errorFactory(`"cors" must be a boolean`);
  if (typeof config.hosts !== 'undefined' && !(config.hosts instanceof Array))
    throw errorFactory(`"hosts" must be an array`);

  hostValidate(config.hosts);
};
