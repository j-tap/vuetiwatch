# Vuetiwatch

[![npm](https://img.shields.io/npm/v/vuetiwatch?color=%23c4f82a&label=npm)](https://www.npmjs.com/package/vuetiwatch)
[![bundle](https://img.shields.io/bundlephobia/minzip/vuetiwatch?label=gzipped)](https://bundlephobia.com/package/vuetiwatch)
[![license](https://img.shields.io/npm/l/vuetiwatch)](https://github.com/j-tap/vuetiwatch/blob/main/LICENSE)

🎨 Free, plug-and-play themes for **[Vuetify 4](https://vuetifyjs.com/)** — what [Bootswatch](https://bootswatch.com/)
is to Bootstrap.

[![The same page in two Vuetify 4 themes — Lux and Morph](https://raw.githubusercontent.com/j-tap/vuetiwatch/main/docs/playground-themes.webp)](https://j-tap.github.io/vuetiwatch/)

**[See all fourteen themes →](https://j-tap.github.io/vuetiwatch/)**

Vuetify ships one look. Vuetiwatch ships fourteen, and they differ in more
than hue: radius, border weight, density, component variants, typography and
icons all move together.

```sh
npm i vuetiwatch      # or: bun add / yarn add / pnpm add
```

## Themes

| Name | Mode | Character |
| --- | --- | --- |
| `classic` | light | Stock Vuetify. Material Design, Roboto, familiar elevation |
| `paper` | light | Flat editorial — warm paper, ink accents, hairline borders, serif headings |
| `slate` | light | Dense dashboard — muted slate blue, compact density, outlined cards |
| `calm` | light | Low contrast, desaturated naturals, no shadows, a lot of air |
| `lux` | light | Editorial luxury — hairline rules, wide tracking, small caps, muted gold |
| `soft` | light | Pastel and generous — large radii, diffuse tinted shadows, hearts for stars |
| `clay` | light | Inflated pastel shapes with a triple shadow. Toy-like |
| `morph` | light | Neumorphic — one continuous surface, shaped only by light and shadow |
| `sketchy` | light | Hand-drawn wobble and pencil greys, for mockups and mirth |
| `brutalist` | light | Thick black rules, acid lime, hard unblurred shadows |
| `liquidGlass` | light | Capsule controls and refracting panes over a calm wash, after iOS 26 |
| `darkGlass` | dark | Frosted translucent surfaces on a deep violet ground |
| `aurora` | dark | Iridescent gradients on near-black — the showcase theme |
| `neon` | dark | Terminal black, cyan and magenta glow, zero radius, monospace headings |

## How to install and apply a theme in Vuetify 4

Register the themes in `createVuetify`, then add the plugin. `defaultTheme`
picks the one that loads; `useTheme().change(name)` switches at runtime.

**1. Register the themes.** They are plain Vuetify `ThemeDefinition`s.

```ts
// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import { vuetiwatchThemes } from 'vuetiwatch'

import 'vuetify/styles'
import 'vuetiwatch/styles.css'

export const vuetify = createVuetify({
  theme: { defaultTheme: 'paper', themes: vuetiwatchThemes },
})
```

**2. Install the plugin, after Vuetify.**

```ts
// main.ts
import { createVuetiwatch, themeList } from 'vuetiwatch'

createApp(App)
  .use(vuetify)
  .use(createVuetiwatch(vuetify, { themes: themeList }))
  .mount('#app')
```

That is the whole setup. Step 1 alone gives you colours and fonts; the
stylesheet and the plugin add everything a `ThemeDefinition` cannot express —
radius, border weight, component variants, icons and per-theme surface
treatment.

The plugin swaps Vuetify's **global component defaults** when the theme
changes, since those are global rather than per-theme. Your own
`createVuetify({ defaults })` is preserved; theme defaults layer on top.

### Switching themes

Standard Vuetify:

```vue
<script setup lang="ts">
import { useTheme } from 'vuetify'
import { themeList } from 'vuetiwatch'

const theme = useTheme()
</script>

<template>
  <button v-for="t in themeList" :key="t.name" @click="theme.change(t.name)">
    {{ t.meta.title }}
  </button>
</template>
```

### Fonts

Themes name the families they want but never load them — that stays your
call. `meta.fonts` lists what each expects, and every family has a system
fallback, so skipping this degrades gracefully rather than breaking.

```html
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">
```

### Shipping only a few themes

Pass just those to the plugin and import their stylesheets instead of the
combined one. A single-theme app drops from about 9.5 kB gzipped to 3.4 kB.

```ts
import { createVuetiwatch, paper } from 'vuetiwatch'
import 'vuetiwatch/styles/core.css'
import 'vuetiwatch/styles/paper.css'

app.use(createVuetiwatch(vuetify, { themes: [paper] }))
```

`core.css` is always needed. A theme file exists only where a theme needs
more than its `ThemeDefinition` can express, so `classic` has none. Every
file also ships as `*.min.css`.

## Writing your own theme

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

### Theme variables

Vuetify re-emits everything under `variables` as a CSS custom property when
the theme changes, which is how the stylesheet stays generic. Alongside
Vuetify's own, it reads:

| Variable | Default | Effect |
| --- | --- | --- |
| `vw-radius` | `4px` | Fields, alerts, lists, menus, snackbars, slider track |
| `vw-radius-btn` | `vw-radius` | Buttons only, for themes whose controls are capsules |
| `vw-radius-lg` | `vw-radius` | Cards, tables, expansion panels |
| `vw-radius-chip` | `9999px` | Chips |
| `vw-radius-thumb` | `50%` | Slider thumb |
| `vw-border-width` | `thin` | Outlined variants and field outlines |
| `vw-btn-weight` / `-tracking` / `-transform` | Vuetify's | Button typography |
| `vw-heading-weight` / `-tracking` / `-transform` | Vuetify's | Headings and the display / headline / title-large scale |
| `vw-th-weight` / `-tracking` / `-transform` | Vuetify's | Table headers |
| `vw-tab-slider-height` | `2px` | Active tab indicator |
| `vw-timeline-line-opacity` | `border-opacity` | Timeline connector, for themes that hold borders at zero |
| `vw-relief-inset` | `0` | Padding inside chip groups, room for controls that lift |
| `vw-overlay-shadow` / `-border` | Vuetify's | Menus, dialogs and tooltips |
| `vw-list-bar` / `-color` | `0` | Accent bar on the active list item, leading edge |
| `vw-pagination-active-color` / `-opacity` | Vuetify's | The current page |
| `vw-link-decoration` | `underline` | Bare `<a>` elements |
| `font-body` / `font-heading` | Roboto | Native to Vuetify 4 |

An explicit `rounded` prop always wins over `vw-radius`.

`font-heading` reaches `text-display-*`, `text-headline-*`, `text-title-large`
and bare `<h1>`–`<h6>`; the rest of the scale takes `font-body`. Vuetify 4
uses the Material 3 names — `text-h1`…`text-h6`, `text-body-1`, `text-caption`
and `text-overline` no longer exist.

### Icons

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

## Requirements

- **Vuetify 4.0+.** v3 is not supported: runtime font switching
  (`--v-font-body`, `--v-font-heading`) and `shadow-color` exist only in v4,
  and without them the themes lose most of what separates them.
- **Vue 3.5+**

## License

MIT
