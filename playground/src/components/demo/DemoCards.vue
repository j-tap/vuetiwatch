<script setup lang="ts">
// Cards carry more of a theme than any other component: variant, radius,
// elevation and the surface treatment all land here at once.
const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text'] as const

const tags = ['Vue', 'Vuetify', 'Themes']
</script>

<template>
  <v-row class="mb-2">
    <v-col v-for="variant in variants" :key="variant" cols="12" sm="6" md="4" lg="">
      <v-card :variant="variant" :title="variant" subtitle="Card variant" height="100%">
        <v-card-text>
          Surface treatment, radius and elevation all come from the theme.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="6" lg="5">
      <!-- A gradient stands in for cover art, so the demo stays offline. -->
      <v-card link height="100%">
        <div class="cover bg-primary" />
        <v-card-item>
          <v-card-title>Featured article</v-card-title>
          <v-card-subtitle>Hover to see the theme's lift</v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <v-chip v-for="tag in tags" :key="tag" size="small" class="me-1">
            {{ tag }}
          </v-chip>
        </v-card-text>
        <v-card-actions>
          <v-btn text="Read" color="primary" />
          <v-spacer />
          <v-btn icon="mdi-bookmark-outline" size="small" />
          <v-btn icon="mdi-share-variant" size="small" />
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card color="primary" title="Coloured card" height="100%">
        <v-card-text>
          An explicit `color` prop wins over the theme's own surface.
        </v-card-text>
        <v-card-actions>
          <v-btn text="Action" variant="tonal" />
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12" lg="3">
      <v-card height="100%">
        <v-list lines="two" density="comfortable">
          <v-list-subheader>Recent</v-list-subheader>
          <v-list-item
            v-for="n in 2"
            :key="n"
            :title="`Item ${n}`"
            subtitle="A card wrapping a list"
            prepend-icon="mdi-circle-medium"
          />
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.cover {
  height: 120px;
  /* Inherit so the theme's card radius clips the cover correctly. */
  border-radius: inherit;
  border-end-start-radius: 0;
  border-end-end-radius: 0;
  background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.35), transparent 60%);
}
</style>
