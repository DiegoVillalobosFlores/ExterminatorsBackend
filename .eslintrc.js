require('eslint-config-molindo/setupPlugins');

module.exports = {
  extends: ['molindo/typescript'],
  env: {
    node: true,
    es6: true,
  },
  plugins: ['only-ascii'],
  rules: {
    // This is sometimes necessary to achive the desired UX
    'jsx-a11y/no-autofocus': 'off',
    // Not necessary for Next.js apps
    'react/react-in-jsx-scope': 'off',
    // Has some false positives and is not really needed
    'react/prop-types': 'off',
    // This is necessary to avoid having characters that might cause some issues
    'only-ascii/only-ascii': 2,
    // this rule is deprecated.
    'jsx-a11y/no-onchange': 'off'
  }
};
