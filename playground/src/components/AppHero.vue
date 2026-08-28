<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { themeList } from 'vuetiwatch'

import AccentSwitcher from '@/components/AccentSwitcher.vue'
import ThemeSwatch from '@/components/ThemeSwatch.vue'
import VariantSwitcher from '@/components/VariantSwitcher.vue'
import { links } from '@/config'

const theme = useTheme()
const current = computed(() =>
  themeList.find(item => item.name === theme.global.name.value) ?? themeList[0],
)

/**
 * Read from the live theme rather than from `meta.swatch`: an accent is
 * applied at runtime, and a strip still showing the theme's original colour
 * would be the one thing on the card that is out of date.
 */
const swatch = computed(() => {
  const colors = theme.current.value?.colors

  if (!colors) return current.value.meta.swatch

  // Vuetify's colours are typed loosely enough to include objects; only the
  // strings are of any use to a swatch.
  return ['background', 'surface', 'primary', 'secondary'].map((key, index) => {
    const value = colors[key]

    return typeof value === 'string'
      ? value
      : current.value.meta.swatch[index] ?? '#000000'
  })
})
</script>

<template>
  <section class="hero">
    <v-container class="hero__inner py-10 py-md-16">
      <v-row align="center">
        <v-col cols="12" md="7" lg="6">
          <v-chip
            class="mb-4"
            size="small"
            variant="tonal"
            prepend-icon="mdi-palette-swatch"
          >
            {{ themeList.length }} themes, one dependency
          </v-chip>

          <h1 class="text-display-small text-md-display-medium mb-4">
            Themes for Vuetify, live
          </h1>

          <p class="text-body-large text-medium-emphasis mb-6">
            Everything below is plain, unstyled demo markup. Palette, radius,
            elevation, density and typography all come from the theme — switch
            to another one in the top bar and the whole page changes voice
            without a reload.
          </p>

          <div class="d-flex flex-wrap ga-3">
            <v-btn
              color="primary"
              href="#typography"
              text="Browse the components"
              append-icon="mdi-arrow-down"
            />
            <v-btn
              :href="links.repository"
              variant="tonal"
              target="_blank"
              rel="noopener"
              prepend-icon="mdi-github"
              text="Source"
            />
          </div>
        </v-col>

        <v-col cols="12" md="5" lg="6" class="mt-8 mt-md-0">
          <!-- The active theme, described by its own meta — the page's legend. -->
          <v-card class="hero__card mx-auto">
            <ThemeSwatch :colors="swatch" block :height="12" />

            <v-card-item>
              <v-card-title>{{ current.meta.title }}</v-card-title>
              <v-card-subtitle class="text-wrap">
                {{ current.meta.description }}
              </v-card-subtitle>
            </v-card-item>

            <!-- Mode and accent belong to the theme, so they live on the
                 theme's own card rather than in the app bar.
                 `pt-4` is deliberate: Vuetify zeroes the top padding of a
                 `v-card-text` that follows a `v-card-item`, and several
                 themes rule off the title block right above this row, which
                 leaves the controls sitting on the line. -->
            <v-card-text class="d-flex flex-wrap align-center ga-2 pt-4">
              <VariantSwitcher />

              <AccentSwitcher class="ms-1" />

              <v-chip
                v-for="font in current.meta.fonts"
                :key="font"
                size="small"
                variant="outlined"
              >
                {{ font }}
              </v-chip>
            </v-card-text>

            <v-divider />

            <v-card-text class="text-body-small text-medium-emphasis">
              <code>theme.change('{{ current.name }}')</code>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

/**
 * A wash in the theme's own colours, so the hero reads as a band without
 * hardcoding anything a theme cannot repaint.
 */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(60rem 30rem at 12% -25%, rgba(var(--v-theme-primary), 0.16), transparent 62%),
    radial-gradient(48rem 28rem at 88% 0%, rgba(var(--v-theme-secondary), 0.12), transparent 62%);
}

.hero__inner {
  position: relative;
}

.hero__card {
  max-width: 420px;
}
</style>
