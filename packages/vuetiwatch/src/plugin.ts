import { computed, inject, ref, toRaw, watch } from 'vue'
import type { App, ComputedRef, Plugin, Ref } from 'vue'
import type { VuetiwatchAccent, VuetiwatchDefaults, VuetiwatchTheme } from './types.js'
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
    /** The live definitions. Reactive, which is what makes accents work. */
    themes?: { value: Record<string, { colors?: Record<string, string> }> }
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
  startViewTransition?: (callback: () => void) => {
    finished?: Promise<unknown>
    ready?: Promise<unknown>
  }
}

export interface Vuetiwatch {
  /** The themes handed to the plugin, in the order a picker should show them. */
  themes: readonly VuetiwatchTheme[]
  /** The active theme, or `undefined` while a theme outside the list is on. */
  current: ComputedRef<VuetiwatchTheme | undefined>
  /**
   * The variants of the active theme's family, in registration order, or an
   * empty array when it has none. This is what a light/dark switch iterates
   * over — the family is declared in each theme's `meta`, so the app never
   * has to know which themes belong together.
   */
  siblings: ComputedRef<readonly VuetiwatchTheme[]>
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
  /** The accents the active theme offers, or an empty array. */
  accents: ComputedRef<readonly VuetiwatchAccent[]>
  /** The accent in use, by id. `undefined` until one is chosen. */
  accent: Readonly<Ref<string | undefined>>
  /**
   * Repaints the theme in one of its accents.
   *
   * The colours are written into Vuetify's live definitions, which are
   * reactive, so every surface follows within the frame. It is applied to
   * the whole family at once — each variant has its own tone of the same
   * accent — so the choice survives a light/dark switch.
   */
  setAccent: (id: string) => void
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
   * Apply each theme's component defaults.
   *
   * - `'over'` (or `true`) — the theme's values win, so a theme can restyle
   *   a component the app never thought about.
   * - `'under'` — yours win, and the theme fills in only what you left
   *   unset. Use it when the app owns a decision the theme also has an
   *   opinion on: an admin panel with its own density switch, say.
   * - `false` — no theme defaults at all.
   *
   * @default 'over'
   */
  defaults?: boolean | 'over' | 'under'
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

      /**
       * Whatever the app configured itself — theme defaults layer on top.
       *
       * Re-read rather than captured once, because `defaults` is a public
       * ref an app is allowed to reassign at runtime. Anything we did not
       * write ourselves is the app speaking, and becomes the new base;
       * without the check, the first theme change after such a reassignment
       * would quietly throw the app's own defaults away.
       */
      let userDefaults = instance.defaults.value ?? {}
      let applied: VuetiwatchDefaults | undefined

      const defaultsFor = (name: string) => {
        /**
         * The comparison goes through `toRaw`, because Vuetify holds
         * `defaults` in a deep `ref` — "if an object is assigned as a ref's
         * value, the object is made deeply reactive" — so reading it back
         * hands out a proxy of what was written, never the object itself.
         * Comparing the two directly can only ever say "not ours", which is
         * the opposite of what the check asks: every theme change would fold
         * the outgoing theme's defaults into the app's own, and they would
         * never come back off. A theme with none of its own, `classic` above
         * all, then keeps whatever was on screen before it.
         *
         * Only the comparison is unwrapped. Vue asks callers not to hold a
         * persistent reference to a raw object, so what is kept is the proxy
         * Vuetify handed out — `mergeDeep` only ever reads it.
         */
        const live = instance.defaults.value

        if (applied && toRaw(live) !== applied) {
          userDefaults = live ?? {}
        }

        const themeDefaults = defaultsByName.get(name)

        if (!themeDefaults) return userDefaults

        return applyDefaults === 'under'
          ? combine(themeDefaults, userDefaults)
          : combine(userDefaults, themeDefaults)
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

        /**
          * A transition interrupted by the next one rejects `ready` and
          * `finished`. Nothing here awaits them, so the rejection would
          * surface as an unhandled one in the console the first time
          * somebody clicks twice quickly — which is exactly what a theme
          * picker invites.
          */
        const transition = doc.startViewTransition(() => { apply(name) })

        transition?.ready?.catch(() => {})
        transition?.finished?.catch(() => {})
      }

      const current = computed(() =>
        themes.find(theme => theme.name === instance.theme.global.name.value),
      )

      const accent = ref<string>()

      const setAccent = (id: string) => {
        const definitions = instance.theme.themes?.value

        if (!definitions) return

        for (const theme of themes) {
          const preset = theme.meta.accents?.find(item => item.id === id)
          const colors = definitions[theme.name]?.colors

          if (preset && colors) Object.assign(colors, preset.colors)
        }

        accent.value = id
      }

      app.provide<Vuetiwatch>(injectionKey, {
        themes,
        current,
        accents: computed(() => current.value?.meta.accents ?? []),
        accent,
        setAccent,
        siblings: computed(() => {
          const family = current.value?.meta.family

          return family ? themes.filter(theme => theme.meta.family === family) : []
        }),
        change,
      })

      watch(
        () => instance.theme.global.name.value,
        name => {
          if (applyDefaults) {
            applied = defaultsFor(name)
            instance.defaults.value = applied
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
