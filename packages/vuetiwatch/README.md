# Vuetiwatch

🎨 Free, plug-and-play themes for **Vuetify 4** — what [Bootswatch](https://bootswatch.com/)
is to Bootstrap.

Vuetify ships one look. Vuetiwatch ships six, and they differ in more than
hue: radius, border weight, density, component variants and typography all
move together, so switching a theme actually changes the character of the app.

```sh
bun add vuetiwatch      # or: npm i vuetiwatch / yarn add vuetiwatch / pnpm add vuetiwatch
```

## Themes

| Name         | Mode  | Character |
| ------------ | ----- | --------- |
| `classic`    | light | Stock Vuetify. Material Design, Roboto, familiar elevation |
| `paper`      | light | Flat editorial — warm paper, ink accents, hairline borders instead of shadows, serif headings |
| `slate`      | light | Dense dashboard — muted slate blue, compact density, 3px radius, outlined cards |
| `soft`       | light | Pastel and generous — 14–22px radii, diffuse tinted shadows, rounded grotesque |
| `darkGlass`  | dark  | Frosted translucent surfaces on a deep violet ground, backdrop blur |
| `neon`       | dark  | Terminal black, cyan and magenta glow, zero radius, monospace headings |

### Component details

Themes differ below the palette too — a switch, a tab indicator or a checkbox
glyph carries as much character as a colour. Vuetify 4 exposes most of this as
props (`VSwitch.inset`, `VTabs.inset`, `VSlider.thumbSize`), so `createVuetiwatch()`
delivers it through defaults and only the rest needs CSS.

| | Switch | Tab indicator | Slider | Extras |
| --- | --- | --- | --- | --- |
| `classic` | Material | 2px underline | round thumb | — |
| `paper` | square inset, outlined | 3px rule | square thumb and track | double rule under table heads |
| `slate` | square inset, compact | 3px rule | thin, square | accent bar on the active row |
| `soft` | pill inset, lifted | pill behind the tab | fat track, big thumb | round checkboxes |
| `darkGlass` | pill inset, frosted | glowing underline | haloed thumb | — |
| `neon` | square inset, glowing | 3px glowing rule | square, glowing | hollow checkboxes, accent bar |

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
| `vw-radius`          | `4px`     | Buttons, fields, alerts, lists, menus, snackbars |
| `vw-radius-lg`       | `vw-radius` | Cards, tables, expansion panels |
| `vw-radius-chip`     | `9999px`  | Chips |
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

## License

MIT
