<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <v-card variant="text">
    <v-card-title>
      <!-- A real heading tag, so themes that set --v-font-heading show it. -->
      <h2 class="text-headline-medium">{{ title }}</h2>
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
