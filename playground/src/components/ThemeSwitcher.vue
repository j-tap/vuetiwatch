<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTheme } from 'vuetify'
import { vuetiwatchThemes } from 'vuetiwatch'

const { global: theme } = useTheme()
const themes = vuetiwatchThemes
const THEME_STORAGE_KEY = 'vuetiwatch:theme'
const selectedTheme = ref(theme.name.value)

watch(selectedTheme, (val) => {
  if (val && Object.keys(themes).includes(val)) {
    setTheme(val)
  }
})

onMounted(() => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  if (saved && Object.keys(themes).includes(saved)) {
    selectedTheme.value = saved
    setTheme(saved)
  }
})

function setTheme(name: string) {
  theme.name.value = name
  localStorage.setItem(THEME_STORAGE_KEY, name)
}
</script>

<template>
  <VBtnToggle
    v-model="selectedTheme"
    color="primary"
    density="compact"
    divided
    mandatory
  >
    <VBtn
      v-for="name in Object.keys(themes)"
      :key="name"
      :value="name"
    >
      {{ name }}
    </VBtn>
  </VBtnToggle>
</template>
