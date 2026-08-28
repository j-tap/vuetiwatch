<script setup lang="ts">
import { ref } from 'vue'

const snackbar = ref(false)
const rating = ref(3)

const alerts = [
  { type: 'success', text: 'Saved successfully' },
  { type: 'info', text: 'Information message' },
  { type: 'warning', text: 'Attention: please check the data' },
  { type: 'error', text: 'An error occurred' },
] as const
</script>

<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-alert
        v-for="alert in alerts"
        :key="alert.type"
        :type="alert.type"
        :text="alert.text"
        class="mb-3"
      />
    </v-col>

    <v-col cols="12" md="6">
      <div class="d-flex flex-wrap align-center ga-4 mb-6">
        <v-btn color="primary" text="Snackbar" @click="snackbar = true" />
        <v-progress-circular indeterminate color="secondary" />
        <v-badge content="9+" color="error">
          <v-icon icon="mdi-bell" />
        </v-badge>
        <v-chip color="success" variant="flat" prepend-icon="mdi-check">Done</v-chip>
      </div>

      <p class="text-label-medium text-medium-emphasis mb-2">Progress</p>
      <v-progress-linear indeterminate color="primary" class="mb-3" />
      <v-progress-linear model-value="62" color="primary" height="8" class="mb-6" />

      <p class="text-label-medium text-medium-emphasis mb-2">Rating</p>
      <v-rating v-model="rating" hover />

      <v-snackbar v-model="snackbar" timeout="3000">
        This is a notification
        <template #actions>
          <v-btn icon="mdi-close" @click="snackbar = false" />
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>
