import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import { ESLint } from 'eslint';

const config = new ESLint({
  baseConfig: {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      browser: true,
      es2020: true,
    },
    globals: globals.browser,
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  ignorePatterns: ['dist'],
  files: ['**/*.{ts,tsx}'],
});

export default config;
