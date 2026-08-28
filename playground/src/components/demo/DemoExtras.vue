<script setup lang="ts">
import { ref } from 'vue'

/**
 * The components a theme is most likely to forget: surfaces that are not
 * cards, inputs that are not text fields, and the pickers that bring their
 * own layout. Everything here was unrepresented while the themes were
 * being built, which is exactly why it belongs on the page.
 */
const step = ref(1)
const otp = ref('')
const amount = ref(4)
const level = ref(40)
const picked = ref(['Vue'])
const date = ref(new Date())

const frameworks = ['Vue', 'React', 'Svelte', 'Solid', 'Angular']

const editable = ref('production')
const colour = ref('#1F6689')
const time = ref('09:30')

const tree = [
  {
    id: 1,
    title: 'packages',
    children: [
      { id: 2, title: 'vuetiwatch' },
      { id: 3, title: 'playground' },
    ],
  },
  { id: 4, title: 'docs' },
]

// A list long enough that rendering it whole would be the wrong answer.
const many = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  title: `Job #${(i + 1).toString().padStart(4, '0')}`,
}))

const traffic = [4, 9, 6, 12, 8, 15, 11, 18, 14, 22, 17, 25]

const rows = [
  { name: 'core.css', size: '2.0 kB', role: 'Always' },
  { name: 'paper.css', size: '0.3 kB', role: 'Optional' },
  { name: 'aurora.css', size: '1.2 kB', role: 'Optional' },
]
</script>

<template>
  <v-row>
    <v-col cols="12">
      <!-- Full width on purpose: a banner is page furniture, and squeezing
           it into a column says more about the column than about the theme. -->
      <v-banner
        icon="mdi-information-outline"
        text="A banner sits between an alert and a toolbar, and owns neither."
      >
        <template #actions>
          <v-btn text="Dismiss" variant="text" />
          <v-btn text="Read more" color="primary" />
        </template>
      </v-banner>
    </v-col>

    <v-col cols="12" lg="6">
      <p class="text-label-medium text-medium-emphasis mb-2">Sheets</p>

      <div class="d-flex ga-4 mb-4">
        <v-sheet class="pa-4 flex-1-1" elevation="4">Elevated sheet</v-sheet>
        <v-sheet class="pa-4 flex-1-1" border>Outlined sheet</v-sheet>
      </div>

      <p class="text-label-medium text-medium-emphasis mb-2">Plain table</p>
      <v-table class="mb-6">
        <thead>
          <tr>
            <th class="text-left">File</th>
            <th class="text-left">Gzipped</th>
            <th class="text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.name">
            <td>{{ row.name }}</td>
            <td>{{ row.size }}</td>
            <td>{{ row.role }}</td>
          </tr>
        </tbody>
      </v-table>

    </v-col>

    <v-col cols="12" lg="6">
      <p class="text-label-medium text-medium-emphasis mb-2">Stepper</p>
      <v-stepper v-model="step" class="mb-6" :items="['Palette', 'Shape', 'Motion']">
        <template #item.1>
          <p class="pa-2">Colours come from the `ThemeDefinition`.</p>
        </template>
        <template #item.2>
          <p class="pa-2">Radius and borders come from the core layer.</p>
        </template>
        <template #item.3>
          <p class="pa-2">Duration and easing come from the theme's own tokens.</p>
        </template>
      </v-stepper>

      <p class="text-label-medium text-medium-emphasis mb-2">Inputs a theme rarely sees</p>
      <v-otp-input v-model="otp" length="5" class="mb-2" />
      <v-number-input v-model="amount" label="Quantity" class="mb-3" />
      <v-autocomplete
        v-model="picked"
        :items="frameworks"
        label="Autocomplete"
        multiple
        chips
        class="mb-3"
      />
      <v-combobox
        :items="frameworks"
        label="Combobox"
        class="mb-3"
      />
      <v-file-input label="File input" prepend-icon="" prepend-inner-icon="mdi-paperclip" class="mb-6" />

      <p class="text-label-medium text-medium-emphasis mb-2">Slider</p>
      <v-slider v-model="level" color="primary" class="mb-6" thumb-label />

    </v-col>
    <!-- Three blocks that size themselves very differently: side by side
         they balance, stacked they leave a column of nothing. -->
    <v-col cols="12" md="6" lg="4">
      <p class="text-label-medium text-medium-emphasis mb-2">Date picker</p>
      <v-date-picker v-model="date" />
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <!-- In a card, like the skeleton beside it: `v-empty-state` paints no
           surface of its own, and next to blocks that do it reads as a hole
           rather than as a state. -->
      <p class="text-label-medium text-medium-emphasis mb-2">Empty state</p>
      <v-card variant="outlined">
        <v-empty-state
        class="mb-6"
        icon="mdi-inbox-outline"
        title="Nothing here yet"
        text="An empty state is a surface, a glyph and a button — three things a theme has to agree on."
      >
          <template #actions>
            <v-btn text="Create one" color="primary" />
          </template>
        </v-empty-state>
      </v-card>
    </v-col>

    <v-col cols="12" lg="4">
      <p class="text-label-medium text-medium-emphasis mb-2">Loading</p>
      <v-card variant="outlined">
        <v-skeleton-loader type="article, actions" />
      </v-card>
    </v-col>

    <!-- The heavier machinery: components with enough layout of their own
         that a theme reaches them only through what it can set globally. -->
    <v-col cols="12" md="6" lg="4">
      <p class="text-label-medium text-medium-emphasis mb-2">Tree and virtual list</p>
      <v-card variant="outlined" class="mb-4">
        <v-treeview :items="tree" item-value="id" open-all density="compact" />
      </v-card>

      <v-card variant="outlined">
        <v-virtual-scroll :items="many" height="180" item-height="40">
          <template #default="{ item }">
            <v-list-item :title="item.title" density="compact" />
          </template>
        </v-virtual-scroll>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <p class="text-label-medium text-medium-emphasis mb-2">Inline edit and shortcuts</p>
      <v-card variant="outlined" class="pa-4 mb-4">
        <v-confirm-edit v-model="editable">
          <template #default="{ model: proxy, actions }">
            <v-text-field v-model="proxy.value" label="Environment" />
            <component :is="actions" />
          </template>
        </v-confirm-edit>
      </v-card>

      <div class="d-flex align-center ga-3">
        <v-hotkey keys="cmd+k" />
        <span class="text-body-small text-medium-emphasis">opens the palette</span>
      </div>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <p class="text-label-medium text-medium-emphasis mb-2">Pickers and figures</p>
      <div class="d-flex flex-wrap ga-4">
        <v-time-picker v-model="time" format="24hr" />
        <div>
          <v-color-picker v-model="colour" width="260" mode="hexa" class="mb-4" />
          <v-sparkline
            :model-value="traffic"
            :gradient="['#1F6689', '#79B4D6']"
            line-width="3"
            smooth
            auto-draw
          />
        </div>
      </div>
    </v-col>
  </v-row>
</template>
