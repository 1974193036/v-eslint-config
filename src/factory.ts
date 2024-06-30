import fs from 'node:fs'
import { isPackageExists } from 'local-pkg'
import gitignore from 'eslint-config-flat-gitignore'
import type { ConfigItem, OptionsConfig } from './types'
import {
  ignores,
  javascript,
  comments,
  node,
  jsdoc,
  imports,
  unicorn,
  perfectionist,
  typescript,
  test,
  vue,
  jsonc,
  sortPackageJson,
  sortTsconfig,
  yaml,
  markdown,
  vueJsx
} from './configs'
import { combine } from './utils'

const VuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli']

const flatConfigProps: (keyof ConfigItem)[] = [
  'files',
  'ignores',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings'
]

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
    perfectionist()
  )

  if (enableVue) componentExts.push('vue')

  if (enableTypeScript) {
    configs.push(
      typescript({
        ...(typeof enableTypeScript !== 'boolean' ? enableTypeScript : {}),
        componentExts,
        overrides: overrides.typescript
      })
    )
  }

  if (options.test ?? true) {
    configs.push(
      test({
        isInEditor,
        overrides: overrides.test
      })
    )
  }

  if (enableVue) {
    configs.push(
      vue({
        overrides: overrides.vue,
        typescript: !!enableTypeScript,
        ...(typeof enableVue !== 'boolean' ? enableVue : {}) // { vueVersion?: 2 | 3 }
      })
    )
  }

  if (options.jsonc ?? true) {
    configs.push(
      jsonc({
        overrides: overrides.jsonc
      }),
      sortPackageJson(),
      sortTsconfig()
    )
  }

  if (options.yaml ?? true) {
    configs.push(
      yaml({
        overrides: overrides.yaml
      })
    )
  }

  if (options.markdown ?? true) {
    configs.push(
      markdown({
        componentExts,
        overrides: overrides.markdown
      })
    )
  }

  /**
   * vueJsx for prettier
   */
  if (options.vueJsx) configs.push(vueJsx())

  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options) acc[key] = options[key] as any
    return acc
  }, {} as ConfigItem)
  if (Object.keys(fusedConfig).length) {
    configs.push([fusedConfig])
  }

  const merged = combine(...configs, ...userConfigs)

  console.log('merged', merged)

  return merged
}
