# Vuetiwatch

🎨 Free, plug-and-play themes for **Vuetify 4** — what [Bootswatch](https://bootswatch.com/)
is to Bootstrap.

Vuetify ships one look. Vuetiwatch ships fourteen, and they differ in more
than hue: radius, border weight, density, component variants and typography
all move together, so switching a theme actually changes the character of the
app.

```sh
bun add vuetiwatch      # or: npm i vuetiwatch / yarn add vuetiwatch / pnpm add vuetiwatch
```

## Themes

Fourteen themes, grouped by how far they stray from a conventional interface.

**Everyday** — safe for products people use all day.

| Name | Mode | Character |
| --- | --- | --- |
| `classic` | light | Stock Vuetify. Material Design, Roboto, familiar elevation |
| `paper` | light | Flat editorial — warm paper, ink accents, hairline borders, serif headings |
| `slate` | light | Dense dashboard — muted slate blue, compact density, outlined cards |
| `calm` | light | Low contrast, desaturated naturals, no shadows, a lot of air |
| `lux` | light | Editorial luxury — hairline rules, wide tracking, small caps, muted gold |
| `soft` | light | Pastel and generous — large radii, diffuse tinted shadows |

**Tactile** — surfaces you can almost feel.

| Name | Mode | Character |
| --- | --- | --- |
| `clay` | light | Inflated pastel shapes with a triple shadow. Toy-like |
| `morph` | light | Neumorphic — one continuous surface, shaped only by light and shadow |

**Expressive** — themes with a strong opinion.

| Name | Mode | Character |
| --- | --- | --- |
| `sketchy` | light | Hand-drawn wobble and pencil greys, for mockups and mirth |
| `brutalist` | light | Thick black rules, acid lime, hard unblurred shadows |
| `liquidGlass` | light | Capsule controls and refracting panes over a calm wash, after iOS 26 |
| `darkGlass` | dark | Frosted translucent surfaces on a deep violet ground |
| `aurora` | dark | Iridescent gradients on near-black — the showcase theme |
| `neon` | dark | Terminal black, cyan and magenta glow, zero radius, monospace headings |

### Component details

Themes differ below the palette too — a switch, a tab indicator or a checkbox
glyph carries as much character as a colour. Vuetify 4 exposes most of this as
props (`VSwitch.inset`, `VTabs.inset`, `VSlider.thumbSize`), so `createVuetiwatch()`
delivers it through defaults and only the rest needs CSS.

| | Switch | Tab indicator | Surfaces |
| --- | --- | --- | --- |
| `classic` | Material | 2px underline | Material elevation |
| `paper` | square inset, outlined | 3px rule | flat, double rule under table heads |
| `slate` | square inset, compact | 3px rule | outlined, accent bar on the active row |
| `calm` | pill inset | 2px underline | nothing raised, nothing filled |
| `lux` | square inset | 1px hairline | flat, small caps, gold hairline on the active row |
| `soft` | pill inset, lifted | pill behind the tab | diffuse tinted shadow, round checkbox glyphs |
| `clay` | pill inset, recessed track | 5px rounded bar | triple shadow, inflated |
| `morph` | pill inset, pressed track | raised bar | dual relief, inputs recessed |
| `sketchy` | square inset | wobbly 3px rule | uneven stroke, redrawn on hover |
| `brutalist` | square inset | 4px rule | hard offset shadow, presses into it |
| `liquidGlass` | pill inset | 2px underline | capsule buttons, blur + saturate, specular rims |
| `darkGlass` | pill inset, frosted | glowing underline | frosted translucent |
| `aurora` | gradient track | gradient rule | iridescent rims, radial glow, gradient display text |
| `neon` | square inset, glowing | glowing rule | glow instead of elevation, hollow checkbox glyphs |

Glyphs move with the theme too. Vuetify's icon *set* is global
configuration and cannot vary per theme, but which glyph a component reaches
for is an ordinary prop — so outlines go to the themes that draw in
hairlines (`paper`, `lux`, `calm`, `neon`), solids to the loud and tactile
ones (`brutalist`, `slate`, `soft`, `clay`), and `sketchy` ticks a drawn box
with a bare marker stroke. `calm` rates in dots rather than stars, `soft` in
hearts, and `liquidGlass` clears a field with the filled circle iOS uses.

```ts
import { icons } from 'vuetiwatch'

icons({
  dropdown: 'mdi-chevron-down',
  checkboxOn: 'mdi-check-circle',
  checkboxOff: 'mdi-circle-outline',
  ratingFull: 'mdi-heart',
  ratingEmpty: 'mdi-heart-outline',
})
```

Every key is optional and spreads across each component that draws it —
`dropdown` reaches selects, expansion panels and list groups at once. Names
must exist in whatever set the app installed; a missing one renders blank.

## Usage

### Colors and fonts only

The themes are plain Vuetify `ThemeDefinition`s, so the minimal setup is one
import:

```ts
// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import { vuetiwatchThemes } from 'vuetiwatch'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'paper',
    themes: vuetiwatchThemes,
  },
})
```

### The full look

Palette is only part of a theme. Radius, border weight and component variants
live outside `ThemeDefinition`, so two more lines unlock them:

```ts
// plugins/vuetify.ts
import 'vuetify/styles'
import 'vuetiwatch/styles.css'   // radius, borders, per-theme surface treatment
```

```ts
// main.ts
import { createApp } from 'vue'
import { createVuetiwatch } from 'vuetiwatch'

import App from './App.vue'
import { vuetify } from './plugins/vuetify'

createApp(App)
  .use(vuetify)
  .use(createVuetiwatch(vuetify))   // must come after Vuetify
  .mount('#app')
```

`createVuetiwatch()` watches the active theme and swaps Vuetify's **global
component defaults** to match — Vuetify's `defaults` are global rather than
per-theme, so a theme that wants outlined cards or compact tables cannot say
so through a `ThemeDefinition` alone. Your own `createVuetify({ defaults })`
is preserved; theme defaults layer on top.

It also mirrors the active theme onto `<html data-vuetiwatch="…">`, which is
what extends the stylesheet to themes you write yourself.

### Switching themes

Standard Vuetify — nothing Vuetiwatch-specific:

```vue
<script setup lang="ts">
import { useTheme } from 'vuetify'
import { themeList } from 'vuetiwatch'

const theme = useTheme()
</script>

<template>
  <button
    v-for="item in themeList"
    :key="item.name"
    @click="theme.change(item.name)"
  >
    {{ item.meta.title }}
  </button>
</template>
```

### Fonts

Themes name the families they want but never load them — that stays your
call. `meta.fonts` lists what each one expects, and every family has a system
fallback, so skipping this step degrades gracefully rather than breaking.

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
>
```

## Writing your own theme

`defineTheme()` fills in everything Vuetify expects but you did not mention,
so a theme file only states what it actually changes:

```ts
import { createVuetify } from 'vuetify'
import { createVuetiwatch, defineTheme, themeList, vuetiwatchThemes } from 'vuetiwatch'

export const midnight = defineTheme({
  name: 'midnight',
  meta: {
    title: 'Midnight',
    description: 'Deep blue, quiet contrast.',
    dark: true,
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
  defaults: {
    VCard: { variant: 'outlined' },
  },
})

const vuetify = createVuetify({
  theme: { themes: { ...vuetiwatchThemes, midnight: midnight.theme } },
})

app.use(vuetify).use(createVuetiwatch(vuetify, {
  themes: [...themeList, midnight],
}))
```

### Theme variables

Vuetify re-emits everything under `variables` as a CSS custom property on
`:root` whenever the theme changes, which is how the stylesheet stays generic.
Alongside Vuetify's own variables, the stylesheet reads:

| Variable             | Default   | Effect |
| -------------------- | --------- | ------ |
| `vw-radius`          | `4px`     | Fields, alerts, lists, menus, snackbars, slider track |
| `vw-radius-btn`      | `vw-radius` | Buttons only, for themes whose controls are capsules |
| `vw-radius-lg`       | `vw-radius` | Cards, tables, expansion panels |
| `vw-radius-chip`     | `9999px`  | Chips |
| `vw-radius-thumb`    | `50%`     | Slider thumb |
| `vw-border-width`    | `thin`    | Outlined variants and field outlines |
| `vw-btn-weight`      | `500`     | Button font weight |
| `vw-btn-tracking`    | `0.089em` | Button letter spacing |
| `vw-btn-transform`   | `uppercase` | Button text transform |
| `font-body`          | `Roboto`  | Body font (native to Vuetify 4) |
| `font-heading`       | `font-body` | Heading font (native to Vuetify 4) |

An explicit `rounded` prop always wins over `vw-radius`.

`font-heading` reaches Vuetify 4's `text-display-*`, `text-headline-*` and
`text-title-large` utilities plus bare `<h1>`–`<h6>` tags; everything below
that in the scale takes `font-body`. Note that v4 uses the Material 3 names —
`text-h1`…`text-h6`, `text-body-1`, `text-caption` and `text-overline` no
longer exist.

## Requirements

- Vuetify **4.0+** — v3 is not supported. Runtime font switching
  (`--v-font-body` / `--v-font-heading`) and `shadow-color` only exist in v4,
  and without them the themes lose most of what separates them.
- Vue 3.5+

## Repository layout

This is a Bun workspace:

| Path                   | What it is |
| ---------------------- | ---------- |
| `packages/vuetiwatch/` | The published package |
| `playground/`          | Live demo of every theme against a wall of Vuetify components |

```sh
bun install
bun run build        # build the package
bun run playground   # build, then serve the demo on :5173
bun run typecheck
```

The playground reads `?theme=<name>` from the URL, so any theme is linkable.

## Contributing

New themes are welcome — add a file under `packages/vuetiwatch/src/themes/`,
register it in `registry.ts`, and check it against every section of the
playground. A theme earns its place by differing structurally, not only in
palette: see the six existing ones for the axes that matter.

## License

MIT
