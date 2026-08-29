<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useDisplay } from 'vuetify'

import AccentSwitcher from '@/components/AccentSwitcher.vue'
import AppFooter from '@/components/AppFooter.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import VariantSwitcher from '@/components/VariantSwitcher.vue'
import AdminView from '@/components/views/AdminView.vue'
import ComponentsView from '@/components/views/ComponentsView.vue'
import LandingView from '@/components/views/LandingView.vue'
import MobileView from '@/components/views/MobileView.vue'
import { demoSections } from '@/components/demo/sections'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useView } from '@/composables/useView'
import { links } from '@/config'

const { active: view, views, go } = useView()

const PAGES = { components: ComponentsView, landing: LandingView, admin: AdminView, mobile: MobileView }

// The favicon itself, so the tab and the app bar carry one mark. `BASE_URL`
// keeps it resolvable under the GitHub Pages subdirectory too.
const logo = `${import.meta.env.BASE_URL}vite.svg`

const { mdAndDown } = useDisplay()

const drawer = ref(false)
// Wide screens have room for the index; narrow ones open it on demand.
watchEffect(() => {
  drawer.value = !mdAndDown.value
})

const { active, scrolled } = useScrollSpy(demoSections.map(section => section.id))

// Anchors do the scrolling; the drawer only has to get out of the way.
function onNavigate () {
  if (mdAndDown.value) drawer.value = false
}

// Smoothness comes from `scroll-behavior` on the document, as it does for anchors.
function scrollToTop () {
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <!-- No :theme binding needed — the global theme cascades from the plugin. -->
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon
        aria-label="Toggle the section index"
        @click="drawer = !drawer"
      />

      <img :src="logo" class="ms-1 d-block" width="28" height="28" alt="" />

      <v-toolbar-title>Vuetiwatch</v-toolbar-title>

      <v-chip
        v-if="view !== 'components'"
        class="d-none d-sm-flex"
        size="small"
        variant="tonal"
      >
        {{ views.find(page => page.id === view)?.title }}
      </v-chip>

      <v-spacer />

      <ThemeSwitcher />

      <v-tooltip text="View on GitHub" location="bottom">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            :href="links.repository"
            icon="mdi-github"
            target="_blank"
            rel="noopener"
            aria-label="View the project on GitHub"
          />
        </template>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :temporary="mdAndDown" width="264">
      <v-list :selected="[view]" density="compact" nav>
        <v-list-subheader>Pages</v-list-subheader>

        <v-list-item
          v-for="page in views"
          :key="page.id"
          :value="page.id"
          :title="page.title"
          :subtitle="page.subtitle"
          :prepend-icon="page.icon"
          lines="two"
          @click="go(page.id); onNavigate()"
        />
      </v-list>

      <v-divider class="my-2" />

      <!-- The section index belongs to the component wall, so it appears
           with it. On the two page mock-ups the theme controls take its
           place: they live on the hero card, and these pages have none. -->
      <v-list v-if="view === 'components'" :selected="[active]" density="compact" nav>
        <v-list-subheader>Sections</v-list-subheader>

        <v-list-item
          v-for="section in demoSections"
          :key="section.id"
          :value="section.id"
          :title="section.title"
          :prepend-icon="section.icon"
          :href="`#${section.id}`"
          @click="onNavigate"
        />
      </v-list>

      <div v-else class="pa-4">
        <p class="text-label-medium text-medium-emphasis mb-3">Theme</p>
        <VariantSwitcher :labels="false" />
        <AccentSwitcher class="mt-3" />
      </div>
    </v-navigation-drawer>

    <v-main>
      <component :is="PAGES[view]" />
    </v-main>

    <AppFooter />

    <!--
      Declared last, and in `app` mode, so the layout floats it clear of the
      footer instead of over the links in it.
    -->
    <v-fab
      :active="scrolled"
      icon="mdi-arrow-up"
      color="primary"
      size="small"
      location="bottom end"
      aria-label="Back to top"
      app
      appear
      @click="scrollToTop"
    />
  </v-app>
</template>
