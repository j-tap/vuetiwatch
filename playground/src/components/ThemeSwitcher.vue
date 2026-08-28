<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { themeList, useVuetiwatch } from 'vuetiwatch'

import ThemeSwatch from '@/components/ThemeSwatch.vue'

const STORAGE_KEY = 'vuetiwatch:theme'
const QUERY_KEY = 'theme'

const theme = useTheme()
// Switching through the plugin rather than through Vuetify wraps the change
// in a view transition, so the new theme wipes in from the item clicked.
const vuetiwatch = useVuetiwatch()
const current = computed(() =>
  themeList.find(item => item.name === theme.global.name.value) ?? themeList[0],
)

const isKnown = (name: string | null): name is string =>
  !!name && themeList.some(item => item.name === name)

function select (name: string, event?: MouseEvent | KeyboardEvent) {
  vuetiwatch.change(name, event)
  localStorage.setItem(STORAGE_KEY, name)

  // Keep the URL shareable — ?theme=neon lands on the theme directly.
  const url = new URL(window.location.href)
  url.searchParams.set(QUERY_KEY, name)
  window.history.replaceState(null, '', url)
}

onMounted(() => {
  const requested = new URL(window.location.href).searchParams.get(QUERY_KEY)
  const saved = localStorage.getItem(STORAGE_KEY)

  if (isKnown(requested)) select(requested)
  else if (isKnown(saved)) theme.change(saved)
})
</script>

<template>
  <!-- Picking a theme closes the menu: the page behind it is the preview. -->
  <v-menu location="bottom end">
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="text" class="px-2 px-sm-4">
        <ThemeSwatch :colors="current.meta.swatch" />
        <!-- On a phone the swatch alone has to carry it; the bar is full. -->
        <span class="d-none d-sm-inline ms-3">{{ current.meta.title }}</span>
        <v-icon icon="mdi-chevron-down" end class="d-none d-sm-inline-flex" />
      </v-btn>
    </template>

    <v-list min-width="320" max-width="380" :selected="[current.name]">
      <v-list-subheader>Vuetiwatch themes</v-list-subheader>

      <v-list-item
        v-for="item in themeList"
        :key="item.name"
        :value="item.name"
        :title="item.meta.title"
        :subtitle="item.meta.description"
        lines="two"
        @click="select(item.name, $event)"
      >
        <template #prepend>
          <ThemeSwatch
            :colors="item.meta.swatch"
            :width="12"
            :height="28"
            class="me-3"
          />
        </template>

        <template #append>
          <v-icon v-if="item.name === current.name" icon="mdi-check" size="small" />
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
