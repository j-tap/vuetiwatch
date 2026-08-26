<script setup lang="ts">
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
const menu = ['Home', 'About']
const subMenu = ['Bio', 'Settings', 'Logout']
</script>

<template>
  <v-row density="compact">
    <v-col v-for="color in colors" :key="color" cols="12" lg="6">
      <v-toolbar :color="color">
        <!-- `flex-0-0`, not `flex-grow-0`: the title's own rule is `flex: 1 1 0`,
             so dropping the grow alone collapses it to nothing. -->
        <v-toolbar-title class="flex-0-0 me-2">
          <v-icon icon="mdi-vuetify" />
        </v-toolbar-title>

        <!--
          The links belong inside `v-toolbar-items`. That container stretches
          its children to the full bar height, so an activator left outside it
          hovers at a different height.

          Two bars share a row from `lg` up, which leaves each one about as
          wide as a tablet — so below `sm`, where even one bar is narrow, the
          links collapse into a menu button the way a real app would.
        -->
        <v-toolbar-items class="d-none d-sm-flex">
          <v-btn v-for="title in menu" :key="title" :text="title" />

          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props">
                Profile
                <v-icon icon="mdi-menu-down" end />
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="title in subMenu" :key="title" :title="title" />
            </v-list>
          </v-menu>
        </v-toolbar-items>

        <v-spacer />

        <v-btn icon="mdi-magnify" />
        <v-app-bar-nav-icon class="d-sm-none" aria-label="Open the menu" />
      </v-toolbar>
    </v-col>
  </v-row>
</template>
