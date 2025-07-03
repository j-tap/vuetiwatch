<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import DemoButtons from '@/components/demo/DemoButtons.vue'
import DemoDialog from '@/components/demo/DemoDialog.vue'
import DemoNavbars from '@/components/demo/DemoNavbars.vue'
import DemoFeedback from '@/components/demo/DemoFeedback.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import DemoForm from '@/components/demo/DemoForm.vue'
import DemoTable from '@/components/demo/DemoTable.vue'

const { global: theme } = useTheme()
</script>

<template>
  <VApp :theme="theme.name.value">
    <VAppBar>
      <VToolbarTitle>Vuetify Playground</VToolbarTitle>
      <VSpacer />
      <ThemeSwitcher />
    </VAppBar>
    <VMain>
      <VContainer fluid>
        <!-- DEMO -->
        <DemoNavbars />
        <DemoButtons />
        <DemoForm />
        <DemoDialog />
        <DemoFeedback />
        <DemoTable />
      </VContainer>
    </VMain>
  </VApp>
</template>
