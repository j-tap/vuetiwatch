<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { themeList } from 'vuetiwatch'

const STORAGE_KEY = 'vuetiwatch:theme'
const QUERY_KEY = 'theme'

const theme = useTheme()
const current = computed(() =>
  themeList.find(item => item.name === theme.global.name.value) ?? themeList[0],
)

const isKnown = (name: string | null): name is string =>
  !!name && themeList.some(item => item.name === name)

function select (name: string) {
  theme.change(name)
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
  <v-menu location="bottom end" :close-on-content-click="false">
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="text" append-icon="mdi-chevron-down">
        <span class="swatch me-3">
          <i v-for="color in current.meta.swatch" :key="color" :style="{ background: color }" />
        </span>
        {{ current.meta.title }}
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
        @click="select(item.name)"
      >
        <template #prepend>
          <span class="swatch swatch--stacked me-3">
            <i v-for="color in item.meta.swatch" :key="color" :style="{ background: color }" />
          </span>
        </template>

        <template #append>
          <v-icon v-if="item.name === current.name" icon="mdi-check" size="small" />
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.swatch {
  display: inline-flex;
  overflow: hidden;
  border: 1px solid rgba(var(--v-border-color), 0.4);
  border-radius: 3px;
}

.swatch i {
  width: 10px;
  height: 20px;
}

.swatch--stacked i {
  width: 12px;
  height: 28px;
}
</style>
