# What wins

*Part of the [Vuetiwatch](../README.md) documentation: [writing a theme](authoring.md) · [theme variables](theme-variables.md) · [what wins](cascade.md) · [contrast](contrast.md).*

The [theme variables](theme-variables.md) set the *default* a component draws
with — the same job Vuetify's SASS variables do at build time, moved to
runtime so the look can be swapped without recompiling. Vuetify draws the same
line itself: it ships `$button-border-radius` for the default and
`$button-rounded-border-radius` for what the `rounded` prop asks for.

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
