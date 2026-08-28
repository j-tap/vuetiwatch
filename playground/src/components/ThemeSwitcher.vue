<script setup lang="ts">
import { onMounted } from 'vue'
import { themeList } from 'vuetiwatch'

import ThemeSwatch from '@/components/ThemeSwatch.vue'
import { useThemeSelection } from '@/composables/useThemeSelection'

const { current, select, restore } = useThemeSelection()

onMounted(restore)
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
