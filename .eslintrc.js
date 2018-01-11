module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: 'eslint:recommended',
  rules: {
    indent: ['error', 2],
    quotes: ['off', 'single'],
    semi: ['error', 'always'],
    'no-console': ['error', { allow: ['info'] }],
    'linebreak-style': ['error', 'unix'],
  },
  plugins: ['jest', 'flowtype'],
};
