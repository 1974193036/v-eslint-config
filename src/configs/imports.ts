import type { ConfigItem } from '../types'
import { pluginAntfu, pluginImport } from '../plugins'
import { GLOB_SRC_EXT } from '../globs'

export function imports(): ConfigItem[] {
  return [
    {
      name: 'shishuaiyun:imports',
      plugins: {
        antfu: pluginAntfu,
        import: pluginImport
      },
      rules: {
        'antfu/import-dedupe': 'error',
        'antfu/no-import-node-modules-by-path': 'error',

        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': 'error'
      }
    }
  ]
}
