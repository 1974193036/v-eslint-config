import type { ConfigItem, OptionsOverrides } from '../types'
import { GLOB_YAML } from '../globs'
import { parserYaml, pluginYaml } from '../plugins'

export function yaml(options: OptionsOverrides = {}): ConfigItem[] {
  const { overrides = {} } = options

  const indent: number | string = 2
  const quotes = 'single'

  return [
    {
      name: 'shishuaiyun:yaml:setup',
      plugins: {
        yaml: pluginYaml as any // eslint-plugin-yml
      }
    },
    {
      files: [GLOB_YAML],
      languageOptions: {
        parser: parserYaml // yaml-eslint-parser
      },
      name: 'shishuaiyun:yaml:rules',
      rules: {
        'style/spaced-comment': 'off',

        'yaml/block-mapping': 'error',
        'yaml/block-sequence': 'error',
        'yaml/no-empty-key': 'error',
        'yaml/no-empty-sequence-entry': 'error',
        'yaml/no-irregular-whitespace': 'error',
        'yaml/plain-scalar': 'error',

        'yaml/vue-custom-block/no-parsing-error': 'error',

        'yaml/block-mapping-question-indicator-newline': 'error',
        'yaml/block-sequence-hyphen-indicator-newline': 'error',
        'yaml/flow-mapping-curly-newline': 'error',
        'yaml/flow-mapping-curly-spacing': 'error',
        'yaml/flow-sequence-bracket-newline': 'error',
        'yaml/flow-sequence-bracket-spacing': 'error',
        'yaml/indent': ['error', (typeof indent === 'string' && indent === 'tab') ? 2 : indent],
        'yaml/key-spacing': 'error',
        'yaml/no-tab-indent': 'error',
        'yaml/quotes': ['error', { avoidEscape: false, prefer: quotes }],
        'yaml/spaced-comment': 'error',

        ...overrides
      }
    }
  ]
}
