import { computed, inject, watch } from 'vue'
import type { App, ComputedRef, Plugin } from 'vue'
import type { VuetiwatchDefaults, VuetiwatchTheme } from './types.js'
import { combine } from './util/defaults.js'

/**
 * The `defaults` ref exposed by `createVuetify()`, plus the theme instance
 * we need to follow. Typed structurally so the plugin does not depend on
 * Vuetify's internal types.
 */
interface VuetifyLike {
  defaults: { value: VuetiwatchDefaults }
  theme: {
    global: { name: { value: string } }
    /** Present in Vuetify 4; the name ref is assigned directly without it. */
    change?: (name: string) => void
  }
}

/**
 * Anything that might carry viewport coordinates. Partial on purpose: a
 * list item hands its handler `MouseEvent | KeyboardEvent`, and a keyboard
 * activation should not have to be filtered out by every caller.
 */
interface Point {
  clientX?: number
  clientY?: number
}

/**
 * Same-document view transitions, Baseline since October 2025. Declared
 * here rather than relied on from `lib.dom` so the package builds against
 * older TypeScript DOM libraries too.
 */
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown
}

export interface Vuetiwatch {
  /** The themes handed to the plugin, in the order a picker should show them. */
  themes: readonly VuetiwatchTheme[]
  /** The active theme, or `undefined` while a theme outside the list is on. */
  current: ComputedRef<VuetiwatchTheme | undefined>
  /**
   * Switches theme through a view transition when the browser has one.
   *
   * Pass the event that triggered it and the new theme opens as a circle
   * from the pointer; without one it opens from the centre of the screen.
   * Falls back to an instant change where the API is missing, where the
   * user asked for reduced motion, or where `transitions` is off — so it is
   * always safe to call.
   */
  change: (name: string, event?: Point | Event | null) => void
}

const injectionKey = Symbol.for('vuetiwatch')

/**
 * The plugin's API, for switching themes and reading the active one.
 *
 * ```ts
 * const { themes, current, change } = useVuetiwatch()
 * ```
 */
export function useVuetiwatch (): Vuetiwatch {
  const api = inject<Vuetiwatch>(injectionKey)

  if (!api) {
    throw new Error(
      '[vuetiwatch] useVuetiwatch() was called before the plugin was installed. ' +
      'Add app.use(createVuetiwatch(vuetify, { themes })) first.',
    )
  }

  return api
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

export interface VuetiwatchOptions {
  /**
   * Themes to manage — normally the package's `themeList`, or just the ones
   * an app ships.
   *
   * Required rather than defaulted, because a default would mean importing
   * the registry here, and a static import cannot be shaken out: every app
   * would carry all sixteen themes even after passing one.
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
  /**
   * Animate theme changes made through `useVuetiwatch().change()`.
   *
   * Only that call is affected — an app switching through Vuetify's own
   * `theme.change()` keeps the instant swap it has today.
   * @default true
   */
  transitions?: boolean
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
 * app.use(vuetify).use(createVuetiwatch(vuetify, { themes: themeList }))
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
    transitions = true,
  } = options

  // Only the defaults are ever read here, so the closure holds those rather
  // than the whole theme objects — palettes and metadata for every theme
  // would otherwise stay pinned for the life of the app.
  const defaultsByName = new Map(themes.map(theme => [theme.name, theme.defaults]))

  return {
    install (app: App) {
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

      const apply = (name: string) => {
        if (instance.theme.change) instance.theme.change(name)
        else instance.theme.global.name.value = name
      }

      const change: Vuetiwatch['change'] = (name, event) => {
        const doc = typeof document !== 'undefined'
          ? document as ViewTransitionDocument
          : undefined

        if (!transitions || !doc?.startViewTransition || prefersReducedMotion()) {
          apply(name)

          return
        }

        /**
          * Viewport coordinates, because the transition pseudo-elements are
          * laid out against the viewport rather than against any element.
          *
          * A click synthesised by the keyboard reports 0/0, which would open
          * the wipe from the corner of the screen rather than from anything
          * the user can see — those fall back to the centre.
          */
        const root = doc.documentElement
        const point = event && 'clientX' in event ? event : undefined
        const fromPointer = !!point?.clientX || !!point?.clientY

        root.style.setProperty('--vw-origin-x', fromPointer ? `${point?.clientX ?? 0}px` : '50%')
        root.style.setProperty('--vw-origin-y', fromPointer ? `${point?.clientY ?? 0}px` : '50%')

        doc.startViewTransition(() => { apply(name) })
      }

      app.provide<Vuetiwatch>(injectionKey, {
        themes,
        current: computed(() =>
          themes.find(theme => theme.name === instance.theme.global.name.value),
        ),
        change,
      })

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
