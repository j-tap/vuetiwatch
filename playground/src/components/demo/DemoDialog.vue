<script setup lang="ts">
import { ref } from 'vue'
import CardPreview from '@/components/CardPreview.vue'

const dialog = ref(false)
</script>

<template>
  <CardPreview title="Dialog">
    <v-btn color="primary" @click="dialog = true">Open dialog</v-btn>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Title text</v-card-title>
        <v-card-text>Dialog text content</v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn @click="dialog = false" color="success">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </CardPreview>
</template>
