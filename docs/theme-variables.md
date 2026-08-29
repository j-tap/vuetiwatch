# Theme variables

*Part of the [Vuetiwatch](../README.md) documentation: [writing a theme](authoring.md) · [theme variables](theme-variables.md) · [what wins](cascade.md) · [contrast](contrast.md).*

Vuetify re-emits everything under `variables` as a CSS custom property when
the theme changes, which is how the stylesheet stays generic. Alongside
Vuetify's own, it reads:

| Variable | Default | Effect |
| --- | --- | --- |
| `vw-radius` | `4px` | Fields, alerts, lists, menus, snackbars, slider track, progress bars |
| `vw-radius-btn` | `vw-radius` | Buttons and button groups, for themes whose controls are capsules |
| `vw-radius-lg` | `vw-radius` | Cards, tables, expansion panels |
| `vw-radius-chip` | `9999px` | Chips and badges |
| `vw-radius-thumb` | `50%` | Slider thumb |
| `vw-radius-icon-btn` | `50%` | Icon buttons, for themes with no curve anywhere |
| `vw-radius-avatar` / `-dot` | `50%` | Avatars, and the dot on a timeline |
| `vw-border-width` | `thin` | Outlined variants and field outlines |
| `vw-outlined-fill` | `surface` | What an outlined card paints — `transparent` for themes whose surface is the ground |
| `vw-panel-border` / `-shadow` / `-fill` | Vuetify's | A panel standing on its own: a bare list, sheet, banner or table |
| `vw-panel-image` / `-filter` | none | The same panel's gradient and backdrop filter, for the gradient and glass themes |
| `vw-outline-opacity` | `border-opacity` | The line around an outlined card, which Vuetify draws in the ink of its own text |
| `vw-skeleton-opacity` | clamped | The bones of a loading placeholder, which Vuetify ties to `border-opacity` |
| `vw-field-border-opacity` | `0.38` | The resting outline of a field — Vuetify's default reads about 2.3:1 |
| `vw-btn-weight` / `-tracking` / `-transform` | Vuetify's | Button typography |
| `vw-heading-weight` / `-tracking` / `-transform` | Vuetify's | Headings and the display / headline / title-large scale |
| `vw-th-weight` / `-tracking` / `-transform` | Vuetify's | Table headers |
| `vw-numeric` | `normal` | Figures in tables and pagination — `tabular-nums` lines columns up |
| `vw-tab-slider-height` | `2px` | Active tab indicator |
| `vw-tab-size` | `0.875rem` | Tab labels, which Vuetify builds out of buttons and sizes like body text |
| `vw-avatar-ratio` | `0.4` | Initials inside an avatar, as a share of its height |
| `vw-timeline-line` / `-width` | hairline | The timeline connector — any background, so a repeating gradient makes it dashed |
| `vw-timeline-line-opacity` | `border-opacity` | The connector's fade, when `vw-timeline-line` is left alone |
| `vw-relief-inset` | `0` | Padding inside chip groups, room for controls that lift |
| `vw-overlay-shadow` / `-border` | Vuetify's | Menus, dialogs and tooltips |
| `vw-list-bar` / `-color` | `0` | Accent bar on the active list item, leading edge |
| `vw-pagination-active-color` / `-opacity` | Vuetify's | The current page |
| `vw-link-decoration` | `underline` | Bare `<a>` elements |
| `font-body` / `font-heading` | Roboto | Native to Vuetify 4 |
| `vw-gradient` / `-btn` | none | A theme's gradient, and the deeper one used where text sits on it |
| `vw-motion-duration` / `-ease` | `160ms` / standard | Press, hover lift, tab slider |
| `vw-press-scale` / `-shift` | `0.98` / `0` | How far a control squashes and sinks under a press |
| `vw-hover-lift` | `0` | How far a linked card rises on hover |
| `vw-pop-scale` / `-duration` | `1.18` / `220ms` | The overshoot when a checkbox, toggle or star turns on |
| `vw-focus-ring` / `-offset` | `2px solid primary` / `2px` | `:focus-visible` on buttons, tabs, chips, list items |
| `vw-theme-transition` | `420ms` | The wipe when `change()` switches theme |

`font-heading` reaches `text-display-*`, `text-headline-*`, `text-title-large`
and bare `<h1>`–`<h6>`; the rest of the scale takes `font-body`. Vuetify 4
uses the Material 3 names — `text-h1`…`text-h6`, `text-body-1`, `text-caption`
and `text-overline` no longer exist.
