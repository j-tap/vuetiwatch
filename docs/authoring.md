# Writing your own theme

*Part of the [Vuetiwatch](../README.md) documentation: [writing a theme](authoring.md) · [theme variables](theme-variables.md) · [what wins](cascade.md) · [contrast](contrast.md).*

A theme states only what it changes — Vuetify merges it over its own `light`
or `dark` first, so anything you leave out is inherited.

```ts
import { defineTheme } from 'vuetiwatch'

export const midnight = defineTheme({
  name: 'midnight',
  meta: {
    title: 'Midnight',
    description: 'Deep blue, quiet contrast.',
    dark: true,
    iconStyle: 'outline',
    swatch: ['#070B18', '#101830', '#5B8DEF', '#8A7BF0'],
    fonts: ['Inter'],
  },
  theme: {
    dark: true,
    colors: { background: '#070B18', surface: '#101830', primary: '#5B8DEF' },
    variables: {
      'font-body': "'Inter', system-ui, sans-serif",
      'vw-radius': '8px',
    },
  },
  defaults: { VCard: { variant: 'outlined' } },
})
```

Register it alongside the rest:

```ts
createVuetify({ theme: { themes: { ...vuetiwatchThemes, midnight: midnight.theme } } })
app.use(createVuetiwatch(vuetify, { themes: [...themeList, midnight] }))
```

## Overlay motion

Which transition a floating surface uses is an ordinary prop, so a theme
owns how its overlays arrive as well as how they look. `overlays()` states it
once for the dialog, the menu, the tooltip and the snackbar — `menu` reaches
the select, the autocomplete and the combobox with it.

```ts
import { overlays, ripple } from 'vuetiwatch'

defineTheme({
  // …
  defaults: [
    overlays({
      dialog: 'fade-transition',
      menu: 'slide-y-transition',
      tooltip: 'fade-transition',
    }),
    ripple(false),
  ],
})
```

`false` means no animation at all, which is the honest answer for a theme
that draws no depth for a surface to arrive through — `brutalist` uses it.

Vuetify bakes the *timing* of each named transition into its own stylesheet,
so naming one only half moves it: a fade takes 300ms whether it belongs to a
theme that settles slowly or to one that repaints instantly. Two variables
take that back, and default to Vuetify's own numbers so a theme that says
nothing changes nothing:

| Variable | What it sets |
| --- | --- |
| `--v-vw-overlay-duration` | How long a surface takes to arrive |
| `--v-vw-overlay-exit` | How long it takes to leave; falls through to the above |

The easing follows `--v-vw-motion-ease`, so a theme that already stated its
curve gets its overlays eased the same way for free.

`ripple(false)` turns off the Material ripple everywhere one is drawn — the
tab, the app-bar nav icon and every tick box included, each of which is its
own defaults key and would otherwise be missed.

## Selection

Dragging across text is answered in the browser's own blue, which belongs to
no palette. Every non-stock theme replaces it with its accent at 24%, which
costs a theme nothing and follows `setAccent()` when one repaints. A theme
that wants a solid highlight states both halves and takes responsibility for
the ink on top:

| Variable | What it sets |
| --- | --- |
| `--v-vw-selection-fill` | The highlight behind selected text |
| `--v-vw-selection-color` | The text on it; defaults to the text's own colour |

## Icons

Vuetify's icon *set* is global and cannot vary per theme, but which glyph a
component draws is an ordinary prop. `icons()` spreads one semantic set across
every component that draws it — `dropdown` reaches selects, expansion panels
and list groups at once.

```ts
import { icons } from 'vuetiwatch'

defineTheme({
  // …
  defaults: [
    icons({
      dropdown: 'mdi-chevron-down',
      checkboxOn: 'mdi-check-circle',
      checkboxOff: 'mdi-circle-outline',
    }),
  ],
})
```

Every key is optional; names must exist in the set the app installed, since a
missing one renders blank.

This covers only the glyphs Vuetify draws for its own controls. An icon the
app passes itself — a mailbox, a dashboard — is content, so a theme declares a
preference through `meta.iconStyle` instead and the app may follow it:

```ts
const outlined = computed(
  () => vuetiwatchMeta[theme.global.name.value]?.iconStyle === 'outline',
)
```
