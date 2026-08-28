<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const select = ref(null)
// Checked, so each theme's `checkboxOn` glyph is visible without a click.
const checkbox = ref(true)
// Preselected, so the active state of the toggle and the radio group is
// visible at a glance rather than only after a click.
const radio = ref('Value B')
const switcher = ref(true)

const options = ['First value', 'Second value', 'Third value']
const radios = ['Value A', 'Value B', 'Value C']

const seasons = ref({
  0: 'Winter',
  1: 'Spring',
  2: 'Summer',
  3: 'Autumn',
})
const icons = ref([
  'mdi-snowflake',
  'mdi-leaf',
  'mdi-fire',
  'mdi-water',
])
function season (val: number) {
  return icons.value[val]
}
</script>

<template>
  <v-form validate-on="blur">
    <v-row density="compact">
      <v-col cols="12" md="6">
        <v-text-field v-model="name" label="Name" placeholder="Enter your name" />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field model-value="Readonly value" label="Readonly value" readonly />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field model-value="Disabled" label="Disabled value" disabled />
      </v-col>

      <v-col cols="12" md="6">
        <v-select v-model="select" :items="options" label="Select" placeholder="Choose an option" />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field label="Country" error-messages="Country is required" append-inner-icon="mdi-alert-outline"/>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field model-value="Country" label="Country" :messages="['Success']" color="success" base-color="success" icon-color="success" append-inner-icon="mdi-check-circle-outline">
          <template #message="{ message }">
            <span class="text-success">{{ message }}</span>
          </template>
        </v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <!--
          Field and button as flex siblings rather than an `append` slot.
          That slot reserves a 16px gap outside the field, so cancelling it
          with a negative margin leaves the pair 16px short of the column
          while every other field fills it.
        -->
        <div class="d-flex">
          <v-text-field
            model-value="example@mail.com"
            label="Email"
            class="rounded-e-0"
            hide-details
          />
          <v-btn
            color="info"
            class="rounded-s-0 h-auto"
            text="Process"
          />
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <v-textarea model-value="Please enter your comments here..." label="Text" prepend-inner-icon="mdi-comment" auto-grow clearable rows="2" />
      </v-col>

      <v-col cols="12" md="6">
        <v-radio-group v-model="radio" label="Choose an option" mandatory inline>
          <v-radio v-for="val in radios" :key="val" :label="val" :value="val" />
        </v-radio-group>
      </v-col>

      <v-col cols="12" md="6" class="d-flex align-center">
        <!-- The toggle is as wide as its labels, so it scrolls rather than
             squeezing the column on a phone. -->
        <v-btn-toggle
          v-model="radio"
          color="primary"
          class="overflow-x-auto"
          divided
          mandatory
        >
          <v-btn v-for="val in radios" :key="val" :value="val">
            {{ val }}
          </v-btn>
        </v-btn-toggle>
      </v-col>

      <v-col cols="12" md="6">
        <v-range-slider
          :model-value="[0, 1]"
          :step="1"
          :ticks="seasons"
          class="mt-8"
          max="3"
          min="0"
          show-ticks="always"
          thumb-label="always"
          tick-size="4"
        >
          <template v-slot:thumb-label="{ modelValue }">
            <v-icon :icon="season(modelValue)" color="background"/>
          </template>
        </v-range-slider>
      </v-col>
    </v-row>

    <div class="d-flex flex-wrap align-center ga-6">
      <v-checkbox v-model="checkbox" label="Accept terms and conditions" hide-details />
      <v-switch v-model="switcher" label="Enable feature" color="primary" hide-details />
      <v-switch v-model="switcher" label="Enable feature" color="success" base-color="error" hide-details />
    </div>
  </v-form>
</template>
