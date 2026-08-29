<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * One screen of an ordinary admin panel: a page header, a row of figures,
 * a table that is the actual work, and a column of context beside it.
 *
 * It is here because a theme can read beautifully on a landing page and
 * still fail at this — too much air, headings that shout, a table that
 * cannot be scanned. Nothing below sets a colour or a size of its own.
 */
const tab = ref('all')
const search = ref('')
const selected = ref<number[]>([])

// The two things a panel does that a page cannot show standing still: it
// opens a form over itself, and it tells you what it just did.
const creating = ref(false)
const step = ref(1)
const saved = ref(false)
const notice = ref(true)

const blank = () => ({
  name: '',
  plan: 'Team',
  seats: 10,
  region: 'eu-central',
  tags: ['billing'] as string[],
  owner: 'Rae Mitchell',
  email: '',
  notes: '',
  cycle: 'monthly',
  alertAt: 80,
  trial: true,
  sso: false,
  features: ['audit-log'] as string[],
})

const draft = ref(blank())

const regions = [
  { title: 'Europe (Frankfurt)', value: 'eu-central' },
  { title: 'Europe (London)', value: 'eu-west' },
  { title: 'US (Virginia)', value: 'us-east' },
  { title: 'Asia (Singapore)', value: 'ap-southeast' },
]

const owners = ['Rae Mitchell', 'Tomás Iglesias', 'Priya Raman', 'Jonas Berg']

function create () {
  creating.value = false
  step.value = 1
  saved.value = true
  draft.value = blank()
}

/**
 * Messages arriving on their own.
 *
 * A panel is never still: something finishes, something fails, somebody
 * upgrades. The snackbar and the badge are the two places a theme has to
 * carry that, and neither shows on a page standing at rest.
 */
const incoming = [
  { text: 'Nightly export finished', icon: 'mdi-database-arrow-down-outline', color: 'success' },
  { text: 'Meridian Group payment failed', icon: 'mdi-alert-outline', color: 'error' },
  { text: 'Foxglove Systems upgraded to Company', icon: 'mdi-arrow-up-bold-circle-outline', color: 'primary' },
  { text: 'Two seats freed on Ardent Studio', icon: 'mdi-account-minus-outline', color: 'info' },
]

const inbox = ref([...incoming])
const unread = ref(2)
const toast = ref(false)
const toastText = ref('')
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  let n = 0

  timer = setInterval(() => {
    const message = incoming[n++ % incoming.length]!

    toastText.value = message.text
    toast.value = true
    unread.value += 1
    inbox.value = [message, ...inbox.value].slice(0, 6)
  }, 9000)
})

onBeforeUnmount(() => clearInterval(timer))

const stats = [
  { label: 'Active users', value: '8,412', delta: '+4.1%', up: true, spark: [12, 14, 13, 17, 16, 21, 24] },
  { label: 'Revenue', value: '$48.2k', delta: '+12.4%', up: true, spark: [8, 9, 12, 11, 15, 18, 22] },
  { label: 'Failed jobs', value: '37', delta: '−18%', up: false, spark: [22, 19, 20, 14, 12, 9, 7] },
  { label: 'Latency p95', value: '284 ms', delta: '+6 ms', up: false, spark: [9, 10, 9, 12, 11, 13, 14] },
]

const headers = [
  { title: 'Account', key: 'name' },
  { title: 'Plan', key: 'plan' },
  { title: 'Seats', key: 'seats', align: 'end' as const },
  { title: 'Status', key: 'status' },
  { title: 'Renews', key: 'renews' },
  { title: '', key: 'actions', sortable: false, align: 'end' as const },
]

const accounts = [
  { id: 1, name: 'Northwind Traders', plan: 'Company', seats: 240, status: 'Active', renews: '2026-09-14' },
  { id: 2, name: 'Halcyon Labs', plan: 'Team', seats: 42, status: 'Active', renews: '2026-09-22' },
  { id: 3, name: 'Meridian Group', plan: 'Team', seats: 18, status: 'Past due', renews: '2026-08-30' },
  { id: 4, name: 'Ardent Studio', plan: 'Free', seats: 6, status: 'Trial', renews: '2026-09-02' },
  { id: 5, name: 'Foxglove Systems', plan: 'Company', seats: 310, status: 'Active', renews: '2026-11-05' },
  { id: 6, name: 'Kestrel Works', plan: 'Team', seats: 27, status: 'Suspended', renews: '—' },
]

const tone: Record<string, string> = {
  Active: 'success',
  Trial: 'info',
  'Past due': 'warning',
  Suspended: 'error',
}

const rows = computed(() => {
  const byTab = tab.value === 'all'
    ? accounts
    : accounts.filter(a => a.status.toLowerCase().replace(' ', '-') === tab.value)

  const term = search.value.trim().toLowerCase()

  return term ? byTab.filter(a => a.name.toLowerCase().includes(term)) : byTab
})

const activity = [
  { text: 'Kestrel Works suspended', time: '12 min ago', icon: 'mdi-pause-circle-outline', color: 'error' },
  { text: 'Invoice #4821 paid', time: '1 h ago', icon: 'mdi-check-circle-outline', color: 'success' },
  { text: 'Halcyon Labs added 6 seats', time: '3 h ago', icon: 'mdi-account-plus-outline', color: 'primary' },
  { text: 'Nightly export finished', time: 'Yesterday', icon: 'mdi-database-arrow-down-outline', color: 'info' },
]
</script>

<template>
  <v-container fluid class="py-6">
    <!-- Page header: where you are, what this is, what you can do here. -->
    <v-breadcrumbs :items="['Console', 'Billing', 'Accounts']" class="px-0 pb-2" />

    <div class="d-flex flex-wrap align-center ga-4 mb-6">
      <div class="flex-1-1">
        <h1 class="text-headline-medium">Accounts</h1>
        <p class="text-body-medium text-medium-emphasis">
          Six workspaces, two of them needing attention.
        </p>
      </div>

      <div class="d-flex align-center ga-2">
        <v-menu location="bottom end" :close-on-content-click="false">
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="text" icon @click="unread = 0">
              <v-badge :content="unread" :model-value="unread > 0" color="error">
                <v-icon icon="mdi-bell-outline" />
              </v-badge>
            </v-btn>
          </template>

          <v-card min-width="320">
            <v-card-item>
              <v-card-title class="text-body-large">Notifications</v-card-title>
            </v-card-item>

            <v-divider />

            <v-list density="compact" max-height="280">
              <v-list-item
                v-for="(item, index) in inbox"
                :key="index"
                :title="item.text"
                :prepend-icon="item.icon"
                :base-color="item.color === 'error' ? 'error' : undefined"
              />
            </v-list>
          </v-card>
        </v-menu>

        <v-btn variant="outlined" prepend-icon="mdi-tray-arrow-down" text="Export" />
        <v-btn color="primary" prepend-icon="mdi-plus" text="New account" @click="creating = true" />

        <v-divider vertical class="mx-1" />

        <!-- Who is signed in, and which workspace they are looking at: the
             two things every console keeps in the top corner. -->
        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="text" class="px-2">
              <v-avatar size="28" color="primary" class="me-2">RM</v-avatar>
              <span class="d-none d-sm-inline">Rae Mitchell</span>
              <v-icon icon="mdi-chevron-down" end />
            </v-btn>
          </template>

          <v-card min-width="260">
            <v-list density="comfortable">
              <v-list-item
                title="Rae Mitchell"
                subtitle="rae@northwind.example"
                lines="two"
              >
                <template #prepend>
                  <v-avatar color="primary">RM</v-avatar>
                </template>
              </v-list-item>
            </v-list>

            <v-divider />

            <v-list density="compact">
              <v-list-subheader>Workspace</v-list-subheader>
              <v-list-item
                v-for="space in ['Northwind (owner)', 'Halcyon Labs', 'Meridian Group']"
                :key="space"
                :title="space"
                :active="space.startsWith('Northwind')"
                prepend-icon="mdi-domain"
              />
            </v-list>

            <v-divider />

            <v-list density="compact">
              <v-list-item title="Profile" prepend-icon="mdi-account-outline" />
              <v-list-item title="Preferences" prepend-icon="mdi-cog-outline" />
              <v-list-item title="Sign out" prepend-icon="mdi-logout" base-color="error" />
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>

    <v-alert
      v-if="notice"
      type="warning"
      variant="tonal"
      class="mb-4"
      closable
      title="Scheduled maintenance"
      text="Billing exports pause on Sunday 03:00–04:00 UTC. Nothing else is affected."
      @click:close="notice = false"
    />

    <!-- Figures -->
    <v-row class="mb-2">
      <v-col v-for="stat in stats" :key="stat.label" cols="12" sm="6" lg="3">
        <v-card>
          <v-card-text>
            <div class="text-label-medium text-medium-emphasis mb-1">{{ stat.label }}</div>
            <div class="d-flex align-center ga-2 mb-2">
              <span class="text-headline-small">{{ stat.value }}</span>
              <v-chip :color="stat.up ? 'success' : 'warning'" size="x-small">{{ stat.delta }}</v-chip>
            </div>
            <v-sparkline
              :model-value="stat.spark"
              :color="stat.up ? 'success' : 'warning'"
              line-width="3"
              height="28"
              smooth
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- The work -->
      <v-col cols="12" lg="8">
        <v-card>
          <v-tabs v-model="tab" density="comfortable">
            <v-tab value="all" text="All" />
            <v-tab value="active" text="Active" />
            <v-tab value="past-due" text="Past due" />
            <v-tab value="suspended" text="Suspended" />
          </v-tabs>

          <v-divider />

          <div class="d-flex flex-wrap align-center ga-3 pa-4">
            <v-text-field
              v-model="search"
              placeholder="Search accounts"
              prepend-inner-icon="mdi-magnify"
              hide-details
              clearable
              class="flex-1-1"
              style="min-width: 220px"
            />
            <v-btn variant="outlined" prepend-icon="mdi-filter-variant" text="Filters" />
            <v-btn
              :disabled="!selected.length"
              variant="tonal"
              prepend-icon="mdi-email-outline"
              :text="selected.length ? `Notify ${selected.length}` : 'Notify'"
            />
          </div>

          <v-divider />

          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="rows"
            item-value="id"
            items-per-page="6"
            show-select
          >
            <template #item.name="{ item }">
              <div class="d-flex align-center ga-3">
                <v-avatar size="28" color="primary">
                  {{ item.name.slice(0, 1) }}
                </v-avatar>
                <span>{{ item.name }}</span>
              </div>
            </template>

            <template #item.status="{ item }">
              <v-chip :color="tone[item.status]" size="small">{{ item.status }}</v-chip>
            </template>

            <template #item.actions>
              <v-menu location="bottom end">
                <template #activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-dots-vertical" size="small" variant="text" />
                </template>

                <v-list density="compact">
                  <v-list-item title="Open" prepend-icon="mdi-open-in-new" />
                  <v-list-item title="Change plan" prepend-icon="mdi-swap-horizontal" />
                  <v-divider class="my-1" />
                  <v-list-item title="Suspend" prepend-icon="mdi-pause" base-color="error" />
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- The context beside it -->
      <v-col cols="12" lg="4">
        <v-card class="mb-4">
          <v-card-item>
            <v-card-title>Needs attention</v-card-title>
          </v-card-item>

          <v-divider />

          <v-list density="compact">
            <v-list-item
              title="Meridian Group"
              subtitle="Payment failed twice"
              prepend-icon="mdi-alert-outline"
            >
              <template #append>
                <v-btn size="small" variant="text" text="Review" />
              </template>
            </v-list-item>
            <v-list-item
              title="Kestrel Works"
              subtitle="Suspended 12 minutes ago"
              prepend-icon="mdi-pause-circle-outline"
            >
              <template #append>
                <v-btn size="small" variant="text" text="Restore" />
              </template>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card>
          <v-card-item>
            <v-card-title>Activity</v-card-title>
          </v-card-item>

          <v-divider />

          <v-card-text>
            <v-timeline side="end" density="compact" truncate-line="both">
              <v-timeline-item
                v-for="entry in activity"
                :key="entry.text"
                :dot-color="entry.color"
                :icon="entry.icon"
                size="small"
              >
                <div class="text-body-medium">{{ entry.text }}</div>
                <div class="text-body-small text-medium-emphasis">{{ entry.time }}</div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>

        <v-card class="mt-4">
          <v-card-item>
            <v-card-title>Usage this month</v-card-title>
          </v-card-item>

          <v-divider />

          <v-card-text>
            <div v-for="quota in [
              { label: 'Seats', used: 643, limit: 800, color: 'primary' },
              { label: 'Storage', used: 412, limit: 500, color: 'warning' },
              { label: 'API calls', used: 128, limit: 1000, color: 'success' },
            ]" :key="quota.label" class="mb-4">
              <div class="d-flex justify-space-between text-body-small mb-1">
                <span>{{ quota.label }}</span>
                <span class="text-medium-emphasis">{{ quota.used }} / {{ quota.limit }}</span>
              </div>
              <v-progress-linear
                :model-value="(quota.used / quota.limit) * 100"
                :color="quota.color"
                height="6"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- A form over the page, which is how half of an admin panel's work
         actually happens. -->
    <!-- The form an admin panel actually asks for: three steps and most of
         the control types in one place, which is where a theme's density,
         radius and label treatment either hold together or do not. -->
    <v-dialog v-model="creating" max-width="720" scrollable>
      <v-card>
        <v-card-item>
          <v-card-title>New account</v-card-title>
          <v-card-subtitle>Three steps. Nothing is charged until the trial ends.</v-card-subtitle>
        </v-card-item>

        <v-divider />

        <v-stepper v-model="step" :items="['Account', 'Contacts', 'Settings']" flat hide-actions>
          <template #item.1>
            <v-row class="pt-2">
              <v-col cols="12" sm="7">
                <v-text-field v-model="draft.name" label="Account name" />
              </v-col>
              <v-col cols="12" sm="5">
                <v-select v-model="draft.plan" :items="['Free', 'Team', 'Company']" label="Plan" />
              </v-col>
              <v-col cols="12" sm="5">
                <v-number-input v-model="draft.seats" label="Seats" :min="1" />
              </v-col>
              <v-col cols="12" sm="7">
                <v-autocomplete v-model="draft.region" :items="regions" label="Region" />
              </v-col>
              <v-col cols="12">
                <v-combobox
                  v-model="draft.tags"
                  :items="['billing', 'enterprise', 'pilot', 'partner']"
                  label="Tags"
                  multiple
                  chips
                  closable-chips
                />
              </v-col>
            </v-row>
          </template>

          <template #item.2>
            <v-row class="pt-2">
              <v-col cols="12" sm="6">
                <v-autocomplete v-model="draft.owner" :items="owners" label="Account owner" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="draft.email"
                  label="Billing email"
                  type="email"
                  placeholder="billing@example.com"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="draft.notes" label="Internal notes" rows="3" />
              </v-col>
              <v-col cols="12">
                <v-file-input label="Signed order form" prepend-icon="" prepend-inner-icon="mdi-paperclip" />
              </v-col>
            </v-row>
          </template>

          <template #item.3>
            <div class="pt-2">
              <v-radio-group v-model="draft.cycle" inline label="Billing cycle">
                <v-radio value="monthly" label="Monthly" />
                <v-radio value="annual" label="Annual (−15%)" />
              </v-radio-group>

              <p class="text-label-medium text-medium-emphasis mb-2">
                Warn when seats reach {{ draft.alertAt }}%
              </p>
              <v-slider v-model="draft.alertAt" :min="50" :max="100" :step="5" thumb-label class="mb-2" />

              <p class="text-label-medium text-medium-emphasis mb-1">Features</p>
              <div class="d-flex flex-wrap ga-4 mb-2">
                <v-checkbox v-model="draft.features" value="audit-log" label="Audit log" hide-details />
                <v-checkbox v-model="draft.features" value="sso-scim" label="SCIM" hide-details />
                <v-checkbox v-model="draft.features" value="sandbox" label="Sandbox" hide-details />
              </div>

              <v-switch v-model="draft.trial" label="Start with a 14-day trial" hide-details />
              <v-switch v-model="draft.sso" label="Require single sign-on" hide-details />
            </div>
          </template>
        </v-stepper>

        <v-divider />

        <v-card-actions>
          <v-btn
            v-if="step > 1"
            variant="text"
            prepend-icon="mdi-chevron-left"
            text="Back"
            @click="step -= 1"
          />
          <v-spacer />
          <v-btn text="Cancel" @click="creating = false" />
          <v-btn
            v-if="step < 3"
            color="primary"
            variant="flat"
            append-icon="mdi-chevron-right"
            text="Next"
            @click="step += 1"
          />
          <v-btn v-else color="primary" variant="flat" text="Create account" @click="create" />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="saved" timeout="3000">
      Account created
      <template #actions>
        <v-btn variant="text" text="Undo" @click="saved = false" />
      </template>
    </v-snackbar>

    <v-snackbar v-model="toast" timeout="4000" location="bottom right">
      {{ toastText }}
      <template #actions>
        <v-btn variant="text" text="View" @click="toast = false" />
      </template>
    </v-snackbar>
  </v-container>
</template>
