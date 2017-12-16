export default obj =>
  typeof obj === 'object' && !(obj instanceof Array) && obj !== null;
