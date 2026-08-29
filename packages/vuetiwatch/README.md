# Vuetiwatch

[![npm](https://img.shields.io/npm/v/vuetiwatch?color=%23c4f82a&label=npm)](https://www.npmjs.com/package/vuetiwatch)
[![bundle](https://img.shields.io/bundlephobia/minzip/vuetiwatch?label=gzipped)](https://bundlephobia.com/package/vuetiwatch)
[![license](https://img.shields.io/npm/l/vuetiwatch)](https://github.com/j-tap/vuetiwatch/blob/main/LICENSE)

🎨 Free, plug-and-play themes for **[Vuetify 4](https://vuetifyjs.com/)** — what [Bootswatch](https://bootswatch.com/)
is to Bootstrap.

[![The same page in two Vuetify 4 themes — Lux and Morph](https://raw.githubusercontent.com/j-tap/vuetiwatch/main/docs/playground-themes.webp)](https://j-tap.github.io/vuetiwatch/)

**[See all nineteen themes →](https://j-tap.github.io/vuetiwatch/)**

Vuetify ships one look. Vuetiwatch ships nineteen, and they differ in more
than hue: radius, border weight, density, component variants, typography,
icons and motion all move together.

```sh
npm i vuetiwatch      # or: bun add / yarn add / pnpm add
```

## Themes

| Name | Mode | Character |
| --- | --- | --- |
| `classic` | light | Stock Vuetify. Material Design, Roboto, familiar elevation |
| `paper` | light | Flat editorial — warm paper, ink accents, hairline borders, serif headings |
| `slate` | light | Dense dashboard — muted slate blue, compact density, outlined cards |
| `atlas` | light | Calm admin — soft neutrals, one cool accent, dense tables, hairlines not shadows |
| `atlasDark` | dark | The same panel after dark — soft greys, never pure black |
| `atlasSepia` | light | The same panel on warm paper and brown ink, for tired eyes |
| `calm` | light | Low contrast, desaturated naturals, no shadows, a lot of air |
| `lux` | light | Editorial luxury — hairline rules, wide tracking, small caps, muted gold |
| `soft` | light | Pastel and generous — large radii, diffuse tinted shadows, hearts for stars |
| `candy` | light | Plush and pillowy — warm cream, padded shapes, controls that squash |
| `clay` | light | Inflated pastel shapes with a triple shadow. Toy-like |
| `morph` | light | Neumorphic — one continuous surface, shaped only by light and shadow |
| `sketchy` | light | Hand-drawn wobble and pencil greys, for mockups and mirth |
| `brutalist` | light | Thick black rules, acid lime, hard unblurred shadows |
| `liquidGlass` | light | Capsule controls and refracting panes over a calm wash, after iOS 26 |
| `darkGlass` | dark | Frosted translucent surfaces on a deep violet ground |
| `aurora` | dark | Iridescent gradients on near-black — the showcase theme |
| `neon` | dark | Terminal black, cyan and magenta glow, zero radius, monospace headings |

`classic` is the control. It opts out of the core stylesheet entirely — not
one rule in this package matches a page running it — so switching to it
shows exactly what the other eighteen add.

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
`createVuetify({ defaults })` is preserved; theme defaults layer on top. It
also exposes `useVuetiwatch()` — see [switching themes](#switching-themes) —
and accepts `defaults`, `attribute` and `transitions` to turn any of it off.

### Switching themes

Vuetify's own `theme.change()` works as it always did. The plugin adds one
thing on top of it:

```vue
<script setup lang="ts">
import { useVuetiwatch } from 'vuetiwatch'

const { themes, current, change } = useVuetiwatch()
</script>

<template>
  <button v-for="t in themes" :key="t.name" @click="change(t.name, $event)">
    {{ t.meta.title }}
  </button>
</template>
```

`useVuetiwatch()` also returns `siblings`: the variants of the theme that is
running, or an empty array when it has none. A theme declares what it belongs
to through `meta.family`, so a light/dark switch never has to know which
themes go together:

```vue
<script setup lang="ts">
const { siblings, current, change } = useVuetiwatch()
</script>

<template>
  <v-btn-toggle v-if="siblings.length > 1" :model-value="current?.name">
    <v-btn
      v-for="t in siblings"
      :key="t.name"
      :value="t.name"
      :text="t.meta.variant"
      @click="change(t.name, $event)"
    />
  </v-btn-toggle>
</template>
```

A theme can also offer **accents** — named colour sets it repaints itself
in, declared in `meta.accents` and applied through `setAccent()`:

```vue
<script setup lang="ts">
const { accents, accent, setAccent } = useVuetiwatch()
</script>

<template>
  <button
    v-for="item in accents"
    :key="item.id"
    :style="{ background: item.colors.primary }"
    @click="setAccent(item.id)"
  />
</template>
```

Presets rather than a colour picker, because every one of them is measured
against the theme's ground — the Atlas accents run 5.8:1 to 8.3:1 on filled
controls across all three variants, which a dragged slider cannot promise.
The id is shared across the family, so the choice survives a light/dark
switch: each variant carries its own tone of the same accent.

`atlas`, `atlasDark` and `atlasSepia` are one family today. Vuetify's
`ThemeDefinition` is a single mode by definition, so a registered pair is
how a light/dark switch is built — the design lives in one place and only
the ground changes.

Pass the event and the new theme opens as a circle from the control that was
pressed, through the View Transitions API — Baseline since October 2025.
Where the API is missing, where the visitor asked for reduced motion, or
where you passed `transitions: false`, the same call switches instantly, so
it is always safe to use. Each theme sets its own pace through
`vw-theme-transition`: `neon` repaints in 180 ms, `calm` takes 560.

### Motion

Movement is the fourth axis these themes travel on, after colour, shape and
type. `brutalist` snaps in two steps, `lux` eases over a quarter-second,
`candy` overshoots and settles — and a checkbox, a toggle button or a rating
star pops when it turns on, the way a like button does.

None of it costs a byte of JavaScript: themes state a character in a handful
of variables and the core layer spends it on the same interactions
everywhere. Only `transform` is animated, so it stays on the compositor.
`prefers-reduced-motion: reduce` zeroes the variables themselves in one
place, which covers every theme at once — including one you wrote yourself.

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
combined one. A single-theme app drops from about 14.1 kB gzipped to 4.5 kB.

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
| `vw-radius` | `4px` | Fields, alerts, lists, menus, snackbars, slider track, progress bars |
| `vw-radius-btn` | `vw-radius` | Buttons and button groups, for themes whose controls are capsules |
| `vw-radius-lg` | `vw-radius` | Cards, tables, expansion panels |
| `vw-radius-chip` | `9999px` | Chips and badges |
| `vw-radius-thumb` | `50%` | Slider thumb |
| `vw-radius-icon-btn` | `50%` | Icon buttons, for themes with no curve anywhere |
| `vw-radius-avatar` / `-dot` | `50%` | Avatars, and the dot on a timeline |
| `vw-border-width` | `thin` | Outlined variants and field outlines |
| `vw-outlined-fill` | `surface` | What an outlined card paints — `transparent` for themes whose surface is the ground |
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

### What wins

These variables set the *default* a component draws with — the same job
Vuetify's SASS variables do at build time, moved to runtime so the look can
be swapped without recompiling. Vuetify draws the same line itself: it ships
`$button-border-radius` for the default and `$button-rounded-border-radius`
for what the `rounded` prop asks for.

Four levels, loudest first:

| | Set by | Example |
| --- | --- | --- |
| **1. A prop or utility class** | the component's author | `<v-card rounded="xl">`, `class="rounded-0"` |
| **2. The theme's component defaults** | the theme | `candy` making every `VBtn` `size="large"` |
| **3. Your `createVuetify({ defaults })`** | you, once | `VDataTable: { hover: true }` |
| **4. Vuetify** | the framework | the 4px corner every component ships with |

Level 1 is why every rule in the core layer carries `:not([class*='rounded-'])`:
a component whose author asked for a corner keeps it whatever the theme says.
Level 2 sits above level 3 on purpose — a theme that could not change a
variant would not be a theme — and `createVuetiwatch(vuetify, { defaults:
'under' })` swaps the two when the app owns a decision the theme also has an
opinion on, an admin panel with its own density switch being the usual case.
It overrides only the keys it actually
sets, so the rest of your configuration survives every switch, including
defaults you assign at runtime. Level 4 holds because every declaration
falls back to Vuetify's own value, which is why importing the stylesheet
cannot change an app that is not running a Vuetiwatch theme.

A fifth level sits underneath, in CSS rather than in props: your own
stylesheet. Vuetify ships every rule inside `@layer vuetify-*`, and an
unlayered rule outranks a layered one whatever its specificity, so the core
layer needs no weight of its own to beat it — and takes none. Its scope is a
`:where()`, which leaves each rule weighing the component selector and its
guard, two classes at most. Anything with a second selector of its own clears
it:

```css
/* wins over the theme */
.v-application .v-btn { border-radius: 0 }
```

A theme file, which carries its own theme class, clears it the same way —
which is what makes a theme an opinion over the defaults rather than a peer
of them. The one exception is marked as such in the stylesheet: a short block
of corrections that has to outrank a theme, because a theme's own rule does
damage in a context it never considered — a per-button shadow drawing a seam
down every join of a button group.

The practical version: if a component looks wrong under a theme, look for a
`rounded`, `variant`, `elevation` or `density` prop on it first. That prop is
doing exactly what it is meant to do, and the theme is standing aside.

### Contrast

Vuetify picks the label colour for a filled control automatically, by
whichever of black or white scores higher on [APCA](https://github.com/Myndex/apca-w3) —
the WCAG 3 draft algorithm. It optimises, but it does not clear a bar: on
Vuetify's own light theme the filled `warning` button lands at 2.4:1 against
WCAG 2's 4.5:1 for label text.

Every theme here is measured against both, and states `on-*` explicitly
wherever the automatic pick falls short — which is the documented way to
control it. Where the two models disagreed the colour was deepened a few
points of lightness instead of flipping the label, so the hue survives and
both models pass; `aurora` keeps its bright gradient for decoration and
carries a deeper one behind anything with text on it.

The result: in all eighteen non-stock themes every filled control clears 4.5:1.
`classic` does not, and that is the point of it — it is stock Vuetify,
including this.

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
