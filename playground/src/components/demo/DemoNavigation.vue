<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'
import { vuetiwatchMeta } from 'vuetiwatch'
import CardPreview from '@/components/CardPreview.vue'

/**
 * Content icons belong to the app, not the theme — Vuetify only lets a
 * theme pick the glyphs of controls it renders itself. A theme can still
 * say which style it would like, though, so this demo follows it: `mdi-cog`
 * where the theme is filled, `mdi-cog-outline` where it is drawn in
 * hairlines.
 */
const theme = useTheme()
const suffix = computed(() =>
  vuetiwatchMeta[theme.global.name.value as keyof typeof vuetiwatchMeta]
    ?.iconStyle === 'outline' ? '-outline' : '',
)
const icon = (name: string) => `${name}${suffix.value}`

const tab = ref('overview')
const pill = ref('all')
const selectedTags = ref(['design'])

const tabs = computed(() => [
  { value: 'overview', title: 'Overview', icon: icon('mdi-view-dashboard') },
  { value: 'activity', title: 'Activity', icon: 'mdi-pulse' },
  { value: 'settings', title: 'Settings', icon: icon('mdi-cog') },
])

const avatarColors = ['primary', 'secondary', 'success']
const filters = ['all', 'open', 'closed']
const tags = ['design', 'code', 'docs', 'infra']

const nav = computed(() => [
  { title: 'Inbox', icon: icon('mdi-inbox'), badge: '12' },
  { title: 'Starred', icon: icon('mdi-star'), badge: '' },
  { title: 'Archive', icon: icon('mdi-archive'), badge: '' },
])

const timeline = computed(() => [
  { title: 'Theme published', color: 'success', icon: 'mdi-check' },
  { title: 'Review requested', color: 'info', icon: icon('mdi-eye') },
  { title: 'Draft created', color: 'warning', icon: icon('mdi-pencil') },
])
</script>

<template>
  <CardPreview title="Navigation & Data Display">
    <v-tabs v-model="tab" class="mb-4">
      <v-tab
        v-for="item in tabs"
        :key="item.value"
        :value="item.value"
        :text="item.title"
        :prepend-icon="item.icon"
      />
    </v-tabs>

    <v-row dense>
      <v-col cols="12" md="4">
        <v-list>
          <v-list-subheader>Mailboxes</v-list-subheader>
          <v-list-item
            v-for="item in nav"
            :key="item.title"
            :title="item.title"
            :prepend-icon="item.icon"
            :active="item.title === 'Inbox'"
          >
            <template #append>
              <v-chip v-if="item.badge" size="x-small">{{ item.badge }}</v-chip>
            </template>
          </v-list-item>
          <v-divider class="my-2" />
          <v-list-item title="Settings" :prepend-icon="icon('mdi-cog')" />
        </v-list>
      </v-col>

      <v-col cols="12" md="4">
        <!-- Chip groups show radius and the tonal/outlined variants at a glance. -->
        <v-chip-group v-model="pill" mandatory class="mb-2">
          <v-chip v-for="item in filters" :key="item" :value="item" filter>
            {{ item }}
          </v-chip>
        </v-chip-group>

        <v-chip-group v-model="selectedTags" multiple column class="mb-4">
          <v-chip
            v-for="item in tags"
            :key="item"
            :value="item"
            variant="outlined"
          >
            {{ item }}
          </v-chip>
        </v-chip-group>

        <div class="d-flex align-center ga-4">
          <div class="v-avatar-group d-flex">
            <v-avatar
              v-for="(color, index) in avatarColors"
              :key="color"
              :color="color"
              size="40"
              :class="{ 'ms-n3': index > 0 }"
            >
              <span class="text-label-medium">{{ color[0]!.toUpperCase() }}</span>
            </v-avatar>
          </div>

          <v-tooltip text="Tooltips inherit the theme radius" location="top">
            <template #activator="{ props }">
              <v-btn v-bind="props" variant="tonal" text="Hover me" />
            </template>
          </v-tooltip>
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <v-timeline side="end" density="compact" truncate-line="both">
          <v-timeline-item
            v-for="item in timeline"
            :key="item.title"
            :dot-color="item.color"
            :icon="item.icon"
            size="small"
          >
            <div class="text-body-medium">{{ item.title }}</div>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </CardPreview>
</template>
