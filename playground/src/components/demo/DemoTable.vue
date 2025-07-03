<script setup lang="ts">
import { ref } from 'vue'
import CardPreview from '@/components/CardPreview.vue'

const page = ref(1)

const breadcrumbs = [
  { title: 'Home', disabled: false },
  { title: 'Category', disabled: false },
  { title: 'Article', disabled: true },
]

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'User', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
  { title: 'Status', key: 'status' },
  { title: 'Created', key: 'created' },
];

const items = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'Active',
    created: '2024-11-01',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'User',
    status: 'Inactive',
    created: '2024-12-15',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 3,
    name: 'Carol Lee',
    email: 'carol.lee@example.com',
    role: 'Moderator',
    status: 'Pending',
    created: '2025-01-03',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 4,
    name: 'David Green',
    email: 'david.green@example.com',
    role: 'User',
    status: 'Active',
    created: '2025-03-22',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: 5,
    name: 'Eva White',
    email: 'eva.white@example.com',
    role: 'Admin',
    status: 'Banned',
    created: '2025-04-10',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: 6,
    name: 'Frank Black',
    email: 'frbla67@example.com',
    role: 'User',
    status: 'Active',
    created: '2025-05-05',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
]

const statusColor = {
  Active: 'success',
  Inactive: 'grey',
  Pending: 'warning',
  Banned: 'error',
}
</script>

<template>
  <CardPreview title="Table elements">
    <v-breadcrumbs :items="breadcrumbs" class="mb-4" />

    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="mb-4"
    >
      <template #item.name="{ item }">
        <div class="d-flex align-center">
          <v-avatar size="32" class="me-2">
            <v-img :src="item.avatar" alt="avatar" />
          </v-avatar>
          <span>{{ item.name }}</span>
        </div>
      </template>

      <template #item.email="{ item }">
        <v-badge v-if="[1,2,5].includes(item.id)" color="info" floating>
          <a :href="`mailto:${item.email}`">{{ item.email }}</a>
          <template #badge>
            <v-icon>mdi-email</v-icon>
          </template>
        </v-badge>
        <a :href="`mailto:${item.email}`" v-else>{{ item.email }}</a>
      </template>

      <template #item.status="{ item }">
        <v-chip
          :color="statusColor[item.status]"
          variant="flat"
          size="small"
        >
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>

    <v-pagination v-model="page" :length="5" />

    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-expansion-panels>
          <v-expansion-panel v-for="val in [1, 2, 3]" :key="val" :title="`Section ${val}`">
            <v-expansion-panel-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </CardPreview>
</template>
