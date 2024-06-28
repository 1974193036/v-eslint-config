import fs from 'node:fs'
import { isPackageExists, getPackageInfo } from 'local-pkg'
import gitignore from 'eslint-config-flat-gitignore'
import type { ConfigItem, OptionsConfig } from './types'
import { ignores, javascript, comments, node, jsdoc, imports, unicorn, perfectionist } from './configs'
import { combine } from './utils'

const VuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli']

export function beauty(
  options: OptionsConfig & ConfigItem = {},
  ...userConfigs: (ConfigItem | ConfigItem[])[]
) {
  const {
    componentExts = [],
    gitignore: enableGitignore = true,
    isInEditor = !!(
      (process.env.VSCODE_PID || process.env.JETBRAINS_IDE) &&
      !process.env.CI
    ),
    overrides = {},
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some(i => isPackageExists(i))
  } = options

  const configs: ConfigItem[][] = []

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      configs.push([gitignore(enableGitignore)])
    } else {
      if (fs.existsSync('.gitignore')) configs.push([gitignore()])
    }
  }

  // Base configs
  configs.push(
    ignores(),
    javascript({
      isInEditor,
      overrides: overrides.javascript
    }),
    comments(),
    node(),
    jsdoc(),
    imports(),
    unicorn(),
    // Optional plugins (installed but not enabled by default)
    perfectionist(),
  )

  const merged = combine(
    ...configs,
    ...userConfigs,
  )

  console.log('merged', merged)

  return merged
}
