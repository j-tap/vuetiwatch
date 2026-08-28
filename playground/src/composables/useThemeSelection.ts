import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { themeList, useVuetiwatch } from 'vuetiwatch'

const STORAGE_KEY = 'vuetiwatch:theme'
const QUERY_KEY = 'theme'

/**
 * Picking a theme, in one place.
 *
 * Two controls in the app bar change the theme — the full picker and the
 * variant switch next to it — and both have to leave the same trail: the
 * plugin's own `change()` so the switch animates, the stored name so a
 * reload comes back to it, and the query string so the URL stays shareable.
 */
export function useThemeSelection () {
  const theme = useTheme()
  const vuetiwatch = useVuetiwatch()

  const current = computed(() =>
    themeList.find(item => item.name === theme.global.name.value) ?? themeList[0],
  )

  const isKnown = (name: string | null): name is string =>
    !!name && themeList.some(item => item.name === name)

  function select (name: string, event?: MouseEvent | KeyboardEvent) {
    vuetiwatch.change(name, event)
    localStorage.setItem(STORAGE_KEY, name)

    const url = new URL(window.location.href)
    url.searchParams.set(QUERY_KEY, name)
    window.history.replaceState(null, '', url)
  }

  /** Call once, from whichever control mounts first. */
  function restore () {
    const requested = new URL(window.location.href).searchParams.get(QUERY_KEY)
    const saved = localStorage.getItem(STORAGE_KEY)

    if (isKnown(requested)) select(requested)
    else if (isKnown(saved)) theme.change(saved)
  }

  return { current, select, restore, siblings: vuetiwatch.siblings }
}
