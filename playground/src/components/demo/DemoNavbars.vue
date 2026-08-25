<script setup lang="ts">
import CardPreview from '@/components/CardPreview.vue'

const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
const menu = ['Home', 'About', 'Contact']
const subMenu = ['Bio', 'Settings', 'Logout']
</script>

<template>
  <CardPreview title="Navbars">
    <v-row dense>
      <v-col v-for="color in colors" :key="color" cols="12" md="6">
        <v-toolbar
          :color="color"
        >
          <v-toolbar-title>
            <v-icon left>mdi-vuetify</v-icon>
          </v-toolbar-title>

          <!--
            The menu belongs inside `v-toolbar-items` with the other links.
            That container stretches its children to the full bar height, so
            an activator left outside it hovers at a different height.
          -->
          <v-toolbar-items>
            <v-btn v-for="title in menu" :key="title" :text="title" />

            <v-menu>
              <template #activator="{ props }">
                <v-btn v-bind="props">
                  Profile
                  <v-icon end>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="title in subMenu" :key="title" :title="title" />
              </v-list>
            </v-menu>
          </v-toolbar-items>

          <v-spacer />

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
  </CardPreview>
</template>
