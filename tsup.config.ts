import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  external:[
    '@antfu/eslint-define-config',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-config-flat-gitignore',
    'eslint-plugin-antfu',
    'eslint-plugin-eslint-comments',
    'eslint-plugin-i',
    'eslint-plugin-jsdoc',
    'eslint-plugin-jsonc',
    'eslint-plugin-markdown',
    'eslint-plugin-n',
    'eslint-plugin-no-only-tests',
    'eslint-plugin-perfectionist',
    'eslint-plugin-prettier',
    'eslint-plugin-unicorn',
    'eslint-plugin-unused-imports',
    'eslint-plugin-vitest',
    'eslint-plugin-vue',
    'eslint-plugin-yml',
    'globals',
    'jsonc-eslint-parser',
    'local-pkg',
    'vue-eslint-parser',
    'yaml-eslint-parser'
  ],
  dts: true,
  shims: false,
})
