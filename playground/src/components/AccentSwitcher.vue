<script setup lang="ts">
import { useVuetiwatch } from 'vuetiwatch'

/**
 * The accent presets a theme offers, as swatches.
 *
 * Presets rather than a picker: every one of them is measured against the
 * theme's ground, which a free colour cannot be. Themes without any render
 * nothing here.
 */
const { accents, accent, setAccent } = useVuetiwatch()
</script>

<template>
  <div v-if="accents.length > 1" class="d-flex align-center ga-2">
    <v-tooltip
      v-for="(item, index) in accents"
      :key="item.id"
      :text="item.title"
      location="bottom"
    >
      <template #activator="{ props }">
        <button
          v-bind="props"
          type="button"
          class="accent"
          :class="{ 'accent--on': accent ? accent === item.id : index === 0 }"
          :style="{ '--accent': item.colors.primary }"
          :aria-label="`Accent: ${item.title}`"
          @click="setAccent(item.id)"
        />
      </template>
    </v-tooltip>
  </div>
</template>

<style scoped>
/**
 * A plain button rather than `v-btn`: this is a colour sample, and every
 * theme in the set would otherwise give it a radius, a shadow and a press.
 */
.accent {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 1px rgba(var(--v-border-color), 0.25);
  transition: box-shadow var(--v-vw-motion-duration, 160ms) var(--v-vw-motion-ease, ease);
}

.accent--on {
  box-shadow:
    0 0 0 2px rgb(var(--v-theme-surface)),
    0 0 0 4px var(--accent);
}

.accent:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
</style>
