// @ts-check
import { defineConfig } from 'eslint/config';
import { baseline } from '@ianflanagan1/ts-baseline/eslint';

export default defineConfig(baseline(import.meta.dirname), {
  files: ['src/core/**/*.ts'],
  rules: {
    'no-restricted-imports': ['error', { patterns: [{ group: ['node:*'], message: 'The core does no I/O.' }] }],
  },
});
