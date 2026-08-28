<script setup lang="ts">
import { useThemeSelection } from '@/composables/useThemeSelection'

/**
 * The mode control for the theme card: a light/dark switch when the theme
 * has variants, and the plain mode label when it does not.
 *
 * The package says which themes belong together — `meta.family` — so this
 * never has to know that Atlas exists.
 */
const { current, select, siblings } = useThemeSelection()

// The package leaves icons to the app: it cannot know which set is installed.
const ICONS: Record<string, string> = {
  Light: 'mdi-white-balance-sunny',
  Dark: 'mdi-weather-night',
  Sepia: 'mdi-coffee-outline',
}

const iconFor = (variant?: string, dark?: boolean) =>
  (variant && ICONS[variant]) ?? (dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny')
</script>

<template>
  <v-btn-toggle
    v-if="siblings.length > 1"
    :model-value="current.name"
    density="comfortable"
    variant="outlined"
    divided
    mandatory
  >
    <v-tooltip
      v-for="item in siblings"
      :key="item.name"
      :text="item.meta.variant ?? item.meta.title"
      location="bottom"
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :value="item.name"
          :prepend-icon="iconFor(item.meta.variant, item.meta.dark)"
          :aria-label="`Switch to ${item.meta.title}`"
          :text="item.meta.variant"
          size="small"
          @click="select(item.name, $event)"
        />
      </template>
    </v-tooltip>
  </v-btn-toggle>

  <v-chip
    v-else
    size="small"
    variant="tonal"
    :prepend-icon="iconFor(undefined, current.meta.dark)"
  >
    {{ current.meta.dark ? 'Dark' : 'Light' }}
  </v-chip>
</template>
