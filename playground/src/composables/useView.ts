import { computed, ref } from 'vue'

/**
 * Which page the playground is showing.
 *
 * Four, and each answers a different question: the component wall shows
 * what a theme does to every control, the landing page how it reads to a
 * visitor, the admin panel how it holds up on a screen someone works in all
 * day, and the phone how it behaves where the controls are different ones
 * entirely. A theme can look good on one and wrong on the next, which is
 * the whole reason to keep all four — and why no page repeats another's
 * components if it can help it.
 *
 * The state is module-level so the drawer and the page agree without props,
 * and it is mirrored into `?view=` the way the theme is into `?theme=` —
 * any of the four is a link someone can send.
 */
export type ViewId = 'components' | 'landing' | 'admin' | 'mobile'

export interface View {
  id: ViewId
  title: string
  subtitle: string
  icon: string
}

export const views: View[] = [
  {
    id: 'components',
    title: 'Components',
    subtitle: 'Every control on one page',
    icon: 'mdi-view-grid-outline',
  },
  {
    id: 'landing',
    title: 'Landing page',
    subtitle: 'The theme as a visitor meets it',
    icon: 'mdi-rocket-launch-outline',
  },
  {
    id: 'admin',
    title: 'Admin panel',
    subtitle: 'The theme at work',
    icon: 'mdi-view-dashboard-outline',
  },
  {
    id: 'mobile',
    title: 'Mobile app',
    subtitle: 'The theme at 360 points',
    icon: 'mdi-cellphone',
  },
]

const QUERY_KEY = 'view'

const isView = (value: string | null): value is ViewId =>
  !!value && views.some(view => view.id === value)

const requested = typeof window !== 'undefined'
  ? new URL(window.location.href).searchParams.get(QUERY_KEY)
  : null

const active = ref<ViewId>(isView(requested) ? requested : 'components')

export function useView () {
  function go (id: ViewId) {
    active.value = id

    const url = new URL(window.location.href)

    // The default view stays out of the URL, so the plain link is the short one.
    if (id === 'components') url.searchParams.delete(QUERY_KEY)
    else url.searchParams.set(QUERY_KEY, id)

    window.history.replaceState(null, '', url)
    window.scrollTo({ top: 0 })
  }

  return { active, views, go, current: computed(() => views.find(v => v.id === active.value)!) }
}
