module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true
  },
  rules: {
    // your rules
    '@typescript-eslint/no-use-before-define': 0,
    'no-use-before-define': 0,
    'no-console': 0,
    '@typescript-eslint/naming-convention': 0,
    'no-underscore-dangle': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/consistent-type-imports': 0
  }
};
