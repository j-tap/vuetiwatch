<script setup lang="ts">
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'] as const
</script>

<template>
  <!--
    A labelled band per variant, wrapping rather than scrolling: six colours
    fit one line on a laptop and fold to two or three on a phone, so nothing
    is ever cut off.
  -->
  <div v-for="variant in variants" :key="variant" class="mb-5">
    <p class="text-label-medium text-medium-emphasis mb-2">{{ variant }}</p>

    <div class="d-flex flex-wrap ga-2">
      <v-btn v-for="color in colors" :key="color" :color="color" :variant="variant">
        {{ color }}
      </v-btn>
    </div>
  </div>

  <v-divider class="mb-5" />

  <p class="text-label-medium text-medium-emphasis mb-2">Sizes and icons</p>

  <div class="d-flex flex-wrap align-center ga-2">
    <v-btn v-for="size in ['x-small', 'small', 'default', 'large']" :key="size" :size="size" color="primary">
      {{ size }}
    </v-btn>
    <v-btn icon="mdi-heart" color="error" />
    <v-btn prepend-icon="mdi-download" variant="outlined" text="With icon" />
    <v-btn loading color="primary" text="Loading" />
    <v-btn disabled text="Disabled" />
  </div>
</template>
