<script setup lang="ts">
import { links } from '@/config'

const external = [
  { title: 'GitHub', icon: 'mdi-github', href: links.repository },
  { title: 'npm', icon: 'mdi-npm', href: links.npm },
  { title: 'Vuetify', icon: 'mdi-vuetify', href: links.vuetify },
]
</script>

<template>
  <v-footer app class="footer">
    <v-container class="py-2 d-flex flex-column flex-sm-row align-center ga-2">
      <span class="text-body-small text-medium-emphasis">
        Vuetiwatch — free themes for Vuetify 4. MIT licensed.
      </span>

      <v-spacer />

      <div class="d-flex flex-wrap justify-center ga-1">
        <v-btn
          v-for="item in external"
          :key="item.title"
          :href="item.href"
          :prepend-icon="item.icon"
          :text="item.title"
          size="small"
          variant="text"
          target="_blank"
          rel="noopener"
        />
      </div>
    </v-container>
  </v-footer>
</template>

<style scoped>
.footer {
  border-block-start: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
