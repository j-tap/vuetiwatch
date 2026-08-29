<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
const fullscreen = ref(false)
</script>

<template>
  <div class="d-flex flex-wrap ga-3">
    <v-btn color="primary" text="Open dialog" @click="dialog = true" />
    <!-- The same surface edge to edge, which is where a phone shows it. -->
    <v-btn variant="tonal" text="Fullscreen" @click="fullscreen = true" />
  </div>

  <v-dialog v-model="dialog" max-width="440">
    <v-card title="Title text">
      <v-card-text>Dialog text content</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text="Cancel" @click="dialog = false" />
        <v-btn color="success" text="Save" @click="dialog = false" />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- No `transition` here: it is the theme's to choose, and naming one
       on the component would override whichever the active theme picked. -->
  <v-dialog v-model="fullscreen" fullscreen>
    <v-card title="Fullscreen dialog">
      <template #append>
        <v-btn icon="mdi-close" variant="text" @click="fullscreen = false" />
      </template>
      <v-card-text>
        On a phone a dialog usually takes the whole screen, so the theme's
        surface and typography carry it on their own.
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
