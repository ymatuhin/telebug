export const isBrowser = typeof window === 'object';
export const isNode = !isBrowser;

export default { isBrowser, isNode };
