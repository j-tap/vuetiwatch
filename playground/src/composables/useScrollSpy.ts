import { onMounted, onUnmounted, ref } from 'vue'

/** How far under the app bar a section has to reach to count as the current one. */
const OFFSET = 96

/** Past this much scrolling the hero is gone and "back to top" earns its place. */
const TOP_THRESHOLD = 320

/**
 * Which of `ids` sits under the app bar, and whether the page has left the
 * top. Both answers read the same scroll position, so they share one
 * rAF-throttled listener rather than one each.
 */
export function useScrollSpy (ids: string[]) {
  const active = ref(ids[0] ?? '')
  const scrolled = ref(false)
  let frame = 0

  function measure () {
    frame = 0

    const y = window.scrollY
    scrolled.value = y > TOP_THRESHOLD

    // The last section can be shorter than the viewport, so scrolling all the
    // way down never brings its top past the line — pin it there instead.
    if (y + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      active.value = ids.at(-1) ?? active.value
      return
    }

    let current = ids[0] ?? ''
    for (const id of ids) {
      const top = document.getElementById(id)?.getBoundingClientRect().top
      if (top !== undefined && top <= OFFSET) current = id
    }
    active.value = current
  }

  // Scroll fires far more often than the page can paint.
  function schedule () {
    frame ||= requestAnimationFrame(measure)
  }

  onMounted(() => {
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
  })

  onUnmounted(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  })

  return { active, scrolled }
}
