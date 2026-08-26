<script setup lang="ts">
/**
 * Vuetify 4 uses the Material 3 scale — `text-h1`…`text-h6` are gone.
 * `display-*`, `headline-*` and `title-large` take --v-font-heading;
 * everything below takes --v-font-body, which is where the two diverge.
 */
const headingScale = [
  { tag: 'h3', class: 'text-display-small' },
  { tag: 'h4', class: 'text-headline-medium' },
  { tag: 'h5', class: 'text-title-large' },
] as const

const bodyScale = [
  { class: 'text-body-large', label: 'Body large' },
  { class: 'text-body-medium', label: 'Body medium' },
  { class: 'text-body-small', label: 'Body small' },
] as const

const labelScale = [
  { class: 'text-label-large', label: 'Label large' },
  { class: 'text-label-medium', label: 'Label medium' },
  { class: 'text-label-small', label: 'Label small' },
] as const
</script>

<template>
  <v-row>
    <v-col cols="12" md="7">
      <component
        :is="item.tag"
        v-for="item in headingScale"
        :key="item.class"
        :class="[item.class, 'mb-2']"
      >
        The quick brown fox
      </component>

      <p class="text-body-large mt-4 mb-4">
        Body copy at the default size. Themes set <code>--v-font-body</code>
        and <code>--v-font-heading</code> — both native to Vuetify 4 — so the
        whole page changes voice at runtime, with no rebuild.
      </p>

      <blockquote class="text-body-large font-italic ps-4 border-s-lg">
        Elevation, radius and density carry as much of a theme as its palette.
      </blockquote>
    </v-col>

    <v-col cols="12" md="5">
      <p class="text-label-medium text-medium-emphasis mb-2">Body scale</p>

      <p
        v-for="item in bodyScale"
        :key="item.class"
        :class="[item.class, 'mb-1']"
      >
        {{ item.label }}
      </p>

      <v-divider class="my-4" />

      <p class="text-label-medium text-medium-emphasis mb-2">Label scale</p>

      <p
        v-for="item in labelScale"
        :key="item.class"
        :class="[item.class, 'text-medium-emphasis', 'mb-1']"
      >
        {{ item.label }}
      </p>

      <v-divider class="my-4" />

      <p class="text-body-medium mb-0">
        Inline <code>code</code> and <kbd>Ctrl</kbd> + <kbd>K</kbd> pick up
        the theme's <code>theme-code</code> and <code>theme-kbd</code>
        colours. Monospace text uses <span class="text-mono">text-mono</span>.
      </p>
    </v-col>
  </v-row>
</template>
