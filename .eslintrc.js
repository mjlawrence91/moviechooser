module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    _: true
  },
  parser: 'babel-eslint',
  extends: 'standard',
  rules: {
    'arrow-parens': 0
  }
}
