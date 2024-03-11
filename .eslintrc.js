module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react/jsx-runtime'],
  plugins: ['prettier'],
  rules: {
    'comma-dangle': ['error', { function: 'never' }],
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
