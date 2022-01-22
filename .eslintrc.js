module.exports = {
  extends: ['@gitart/eslint-config-ts'],
  overrides: [
    {
      files: [
        './src/tests/**/*.spec.ts',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
