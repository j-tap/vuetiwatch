<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useDisplay } from 'vuetify'

import AppFooter from '@/components/AppFooter.vue'
import AppHero from '@/components/AppHero.vue'
import DemoSection from '@/components/DemoSection.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { demoSections } from '@/components/demo/sections'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { links } from '@/config'

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
      <v-list :selected="[active]" density="compact" nav>
        <v-list-subheader>Components</v-list-subheader>

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
    </v-navigation-drawer>

    <v-main>
      <AppHero />

      <v-container class="py-8 py-md-12">
        <v-row>
          <v-col
            v-for="section in demoSections"
            :key="section.id"
            cols="12"
            :lg="section.span ?? 12"
            class="pb-8 pb-md-12"
          >
            <DemoSection
              :id="section.id"
              :title="section.title"
              :subtitle="section.subtitle"
            >
              <component :is="section.component" />
            </DemoSection>
          </v-col>
        </v-row>
      </v-container>
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
