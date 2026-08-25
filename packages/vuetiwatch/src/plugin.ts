import { watch } from 'vue'
import type { App, Plugin } from 'vue'
import type { VuetiwatchDefaults, VuetiwatchTheme } from './types.js'
import { themeList } from './registry.js'
import { mergeDeep } from './util/merge.js'

/**
 * The `defaults` ref exposed by `createVuetify()`, plus the theme instance
 * we need to follow. Typed structurally so the plugin does not depend on
 * Vuetify's internal types.
 */
interface VuetifyLike {
  defaults: { value: VuetiwatchDefaults }
  theme: { global: { name: { value: string } } }
}

export interface VuetiwatchOptions {
  /**
   * Themes to manage. Defaults to every theme in the package — pass a
   * subset if you only ship a few.
   */
  themes?: readonly VuetiwatchTheme[]
  /**
   * Apply each theme's component defaults on top of your own.
   * @default true
   */
  defaults?: boolean
  /**
   * Mirror the active theme name onto `<html data-vuetiwatch="...">`, so
   * you can hang your own CSS off it.
   * @default true
   */
  attribute?: boolean
}

/**
 * Keeps Vuetify's global component defaults in sync with the active theme.
 *
 * Vuetify's `defaults` are global rather than per-theme, so a theme that
 * wants outlined cards or compact tables cannot express that through a
 * `ThemeDefinition` alone. This plugin watches the active theme and swaps
 * those defaults for you, merging them over whatever you passed to
 * `createVuetify({ defaults })`.
 *
 * Install it after Vuetify:
 *
 * ```ts
 * app.use(vuetify).use(createVuetiwatch(vuetify))
 * ```
 */
export function createVuetiwatch (
  vuetify: unknown,
  options: VuetiwatchOptions = {},
): Plugin {
  const {
    themes = themeList,
    defaults: applyDefaults = true,
    attribute = true,
  } = options

  const byName = new Map(themes.map(theme => [theme.name, theme]))

  return {
    install (_app: App) {
      const instance = vuetify as VuetifyLike

      if (!instance?.theme?.global?.name) {
        throw new Error(
          '[vuetiwatch] createVuetiwatch() expects the object returned by createVuetify(). ' +
          'Install it after Vuetify: app.use(vuetify).use(createVuetiwatch(vuetify))',
        )
      }

      // Whatever the app configured itself — theme defaults layer on top of it.
      const userDefaults = instance.defaults.value ?? {}

      watch(
        () => instance.theme.global.name.value,
        name => {
          const theme = byName.get(name)

          if (applyDefaults) {
            instance.defaults.value = theme
              ? mergeDeep(userDefaults as Record<string, any>, theme.defaults as Record<string, any>) as VuetiwatchDefaults
              : userDefaults
          }

          if (attribute && typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-vuetiwatch', name)
          }
        },
        { immediate: true },
      )
    },
  }
}
