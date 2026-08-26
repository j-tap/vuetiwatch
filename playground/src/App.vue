<script setup lang="ts">
import { useTheme } from 'vuetify'

import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import DemoButtons from '@/components/demo/DemoButtons.vue'
import DemoCards from '@/components/demo/DemoCards.vue'
import DemoDialog from '@/components/demo/DemoDialog.vue'
import DemoFeedback from '@/components/demo/DemoFeedback.vue'
import DemoForm from '@/components/demo/DemoForm.vue'
import DemoNavbars from '@/components/demo/DemoNavbars.vue'
import DemoNavigation from '@/components/demo/DemoNavigation.vue'
import DemoTable from '@/components/demo/DemoTable.vue'
import DemoTypography from '@/components/demo/DemoTypography.vue'

const theme = useTheme()

const repository = 'https://github.com/j-tap/vuetiwatch'
</script>

<template>
  <!-- No :theme binding needed — the global theme cascades from the plugin. -->
  <v-app>
    <v-app-bar>
      <v-toolbar-title>Vuetiwatch</v-toolbar-title>
      <v-spacer />
      <ThemeSwitcher />

      <v-tooltip text="View on GitHub" location="bottom">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            :href="repository"
            icon="mdi-github"
            target="_blank"
            rel="noopener"
            aria-label="View the project on GitHub"
          />
        </template>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <p class="text-medium-emphasis mb-6">
          Every component below is unstyled demo markup — the whole difference
          between themes comes from <code>{{ theme.global.name.value }}</code>.
        </p>

        <DemoTypography />
        <DemoNavbars />
        <DemoButtons />
        <DemoCards />
        <DemoNavigation />
        <DemoForm />
        <DemoDialog />
        <DemoFeedback />
        <DemoTable />
      </v-container>
    </v-main>
  </v-app>
</template>
