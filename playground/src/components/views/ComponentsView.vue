<script setup lang="ts">
import AppHero from '@/components/AppHero.vue'
import DemoSection from '@/components/DemoSection.vue'
import { demoSections } from '@/components/demo/sections'
</script>

<template>
  <AppHero />

  <v-container class="py-8 py-md-12">
    <v-row>
      <v-col
        v-for="section in demoSections"
        :key="section.id"
        cols="12"
        :lg="section.span ?? 12"
        class="pb-8 pb-md-12"
      >
        <DemoSection
          :id="section.id"
          :title="section.title"
          :subtitle="section.subtitle"
        >
          <component :is="section.component" />
        </DemoSection>
      </v-col>
    </v-row>
  </v-container>
</template>
