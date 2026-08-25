<script setup lang="ts">
import CardPreview from '@/components/CardPreview.vue'

const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'] as const
</script>

<template>
  <CardPreview title="Buttons">
    <v-row v-for="variant in variants" :key="variant" dense>
      <v-col v-for="color in colors" :key="color" cols="auto">
        <v-btn :color="color" :variant="variant">text</v-btn>
      </v-col>
    </v-row>
  </CardPreview>
</template>
