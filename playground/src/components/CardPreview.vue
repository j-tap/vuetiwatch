<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <v-card variant="text">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <slot/>
    </v-card-text>
  </v-card>
</template>
