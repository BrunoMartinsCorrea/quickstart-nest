module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: ['tsconfig.json'],
          },
        },
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-magic-numbers': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        camelcase: 'warn',
        'default-case-last': 'error',
        eqeqeq: 'error',
        'no-else-return': 'error',
        'no-multi-assign': 'error',
        'no-nested-ternary': 'warn',
        'no-return-await': 'error',
        'no-unused-vars': 'off',
        'no-useless-call': 'error',
        'no-useless-concat': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-regex-literals': 'error',
      },
    },
  ],
};
