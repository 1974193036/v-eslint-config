import { configPrettier, pluginPrettier } from '../plugins'
import type { ConfigItem, OptionsIsInEditor, OptionsOverrides } from '../types'
import { GLOB_JSX, GLOB_TSX, GLOB_VUE } from '../globs'
import { OFF } from '../flags'

export function vueJsx(options: OptionsIsInEditor & OptionsOverrides = {}): ConfigItem[] {
  const {
    overrides = {},
  } = options
  // configPrettier: eslint-config-prettier
  const prettierConfig = configPrettier?.default ? configPrettier.default : configPrettier
  const pluginRules = {
    ...(pluginPrettier as any)?.configs?.recommended?.rules,
  }
  return [
    {
      name: 'shishuaiyun:vue:jsx:setup',
      files: [
        GLOB_JSX,
        GLOB_TSX,
        GLOB_VUE,
      ],
      plugins: {
        prettier: pluginPrettier, // eslint-plugin-prettier
      },
      rules: {
        ...prettierConfig.rules,
        ...pluginRules,
        'prettier/prettier': [
          'warn',
          {
            singleQuote: true,
            semi: false,
            printWidth: 80,
            trailingComma: 'none',
            proseWrap: 'never',
          },
        ],
        'style/comma-dangle': OFF,
        'style/indent': OFF,
        'style/brace-style': OFF,
        'style/operator-linebreak': OFF,
        'style/quote-props': OFF,
        'antfu/if-newline': OFF,
        'antfu/consistent-list-newline': OFF,
        ...overrides,
      },
    },
  ]
}
