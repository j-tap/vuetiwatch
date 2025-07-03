<script setup lang="ts">
import { ref } from 'vue'
import CardPreview from '@/components/CardPreview.vue'

const snackbar = ref(false)
const rating = ref(3)
</script>

<template>
  <CardPreview title="Feedback Components">
    <v-row dense class="mb-4">
      <v-col cols="12" md="6">
        <v-alert type="success" class="mb-2">Saved successfully</v-alert>
        <v-alert type="info" class="mb-2">Information message</v-alert>
        <v-alert type="warning" class="mb-2">Attention: please check the data</v-alert>
        <v-alert type="error">An error occurred</v-alert>
      </v-col>

      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="auto">
            <v-btn color="primary" @click="snackbar = true" class="mb-4">Snackbar</v-btn>
            <v-snackbar v-model="snackbar" timeout="3000">
              This is a notification
              <template #actions>
                <v-btn icon @click="snackbar = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="auto">
            <v-progress-linear indeterminate color="primary" class="mb-4" />
          </v-col>
          <v-col cols="auto">
            <v-progress-circular indeterminate color="secondary" class="mb-4" />
          </v-col>
          <v-col cols="auto">
            <v-badge content="9+" color="error" class="mb-4">
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-col>
        </v-row>

        <v-rating v-model="rating" hover />
      </v-col>
    </v-row>
  </CardPreview>
</template>
