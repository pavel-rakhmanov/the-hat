module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // https://www.npmjs.com/package/eslint-config-airbnb-base
    // https://github.com/airbnb/javascript
    'airbnb-base',
    // https://www.npmjs.com/package/eslint-plugin-import#typescript
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser:  '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
};
