module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'plugin:vue/vue3-recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  env: {
    browser: true,
  },
  // add your custom rules here
  rules: {
    'semi': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // trailing comma
    'comma-dangle': ['error', 'always-multiline'],
    'vue/custom-event-name-casing': 0,
    'vue/comment-directive': 0,
    'import/no-cycle': 0,
  },
};
