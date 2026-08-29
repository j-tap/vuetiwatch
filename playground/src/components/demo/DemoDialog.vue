<script setup lang="ts">
import { computed, ref } from 'vue'
import { useVuetiwatch } from 'vuetiwatch'

const dialog = ref(false)
const fullscreen = ref(false)

const { current } = useVuetiwatch()

/**
 * The phone sheet is the demo's idea, not the theme's, so the demo asks for
 * it — but only where the theme has no opinion of its own. A `transition`
 * named on the component beats the theme default outright, which is how
 * this one used to force a stepped theme through an animation it had
 * declared it did not want.
 *
 * Reading the theme's own defaults rather than checking for `classic` by
 * name: the question is whether this theme states a dialog transition, and
 * a theme built with `defineTheme()` deserves the same answer. `classic`
 * states nothing by design and so keeps the slide it has always had.
 */
const sheet = computed(() =>
  current.value?.defaults?.VDialog?.transition === undefined
    ? { transition: 'dialog-bottom-transition' }
    : {},
)
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

  <v-dialog v-model="fullscreen" fullscreen v-bind="sheet">
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
