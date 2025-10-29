import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-node';

export default [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'dev/**',
      'coverage/**',
      'convert-props.cjs',
      'postbuild.js',
      'rollup.config.*.js',
    ]
  },
  
  // Base configuration for all files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        // Node globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        HTMLElement: 'readonly',
        SVGElement: 'readonly',
        getComputedStyle: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      node: nodePlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      
      // Custom rules - disable strict indentation for now to match existing code
      'indent': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_', 'caughtErrorsIgnorePattern': '^_' }],
      'react/display-name': 'off',
      'react/no-deprecated': 'warn',
      'react/react-in-jsx-scope': 'off', // Not needed with jsx-runtime
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  
  // Test files configuration
  {
    files: ['**/__tests__/**/*.{js,jsx}', '**/*.test.{js,jsx}'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        shallow: 'readonly', // for enzyme
      }
    },
    plugins: {
      jest,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jest.configs.recommended.rules,
      // More lenient rules for test files
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^(_|React|fireEvent|ERROR|mockImageElement|originalInitImage|drag100|pureHorizontalTouch|pureVerticalTouch|rightCrossAxisTouch|leftCrossAxisTouch|capturedStore|unsubscribeSpy|TestComponent|storeRef|waitFor)' }],
    }
  },
  
  // Rollup config files - use module syntax
  {
    files: ['rollup.config.*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      }
    }
  },
  
  // Node.js files (config files, etc.)
  {
    files: ['**/*.cjs', 'babel.config.cjs'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        module: 'writable',
        exports: 'writable',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
      }
    }
  }
];