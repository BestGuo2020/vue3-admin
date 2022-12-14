module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'vue/multi-word-component-names': 'off', // hh
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    endOfLine: 'off',
    eqeqeq: 'error',
    'no-else-return': 'error',
  },
}
