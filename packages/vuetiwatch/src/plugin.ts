import { watch } from 'vue'
import type { App, Plugin } from 'vue'
import type { VuetiwatchDefaults, VuetiwatchTheme } from './types.js'
import { combine } from './util/defaults.js'

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
   * Themes to manage — normally the package's `themeList`, or just the ones
   * an app ships.
   *
   * Required rather than defaulted, because a default would mean importing
   * the registry here, and a static import cannot be shaken out: every app
   * would carry all fourteen themes even after passing one.
   */
  themes: readonly VuetiwatchTheme[]
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
  options: VuetiwatchOptions,
): Plugin {
  const {
    themes,
    defaults: applyDefaults = true,
    attribute = true,
  } = options

  // Only the defaults are ever read here, so the closure holds those rather
  // than the whole theme objects — palettes and metadata for every theme
  // would otherwise stay pinned for the life of the app.
  const defaultsByName = new Map(themes.map(theme => [theme.name, theme.defaults]))

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

      // The merge is a pure function of the theme name, so it is computed at
      // most once per theme however often the app switches.
      const merged = new Map<string, VuetiwatchDefaults>()
      const defaultsFor = (name: string) => {
        const themeDefaults = defaultsByName.get(name)

        if (!themeDefaults) return userDefaults

        let result = merged.get(name)

        if (!result) {
          result = combine(userDefaults, themeDefaults)
          merged.set(name, result)
        }

        return result
      }

      watch(
        () => instance.theme.global.name.value,
        name => {
          if (applyDefaults) {
            instance.defaults.value = defaultsFor(name)
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
