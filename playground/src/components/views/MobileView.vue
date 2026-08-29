<script setup lang="ts">
import { ref } from 'vue'

/**
 * The theme inside a phone.
 *
 * Vuetify's layout components nest, so a `v-layout` with its own app bar,
 * main and bottom navigation runs perfectly well inside a card — which is
 * all a device frame is. Everything here is a component the other two pages
 * deliberately do not use: bottom navigation, a bottom sheet, a floating
 * action button, swipeable windows, a code field, a horizontal slide group.
 * A theme meets different problems at 390px than it does on a dashboard.
 */
const tab = ref('feed')
const pane = ref(0)
const sheet = ref(false)
const code = ref('')
const filter = ref('all')
const snack = ref(false)
const push = ref(true)
const digest = ref(false)
const reminder = ref<Date>()
const loaded = ref(4)

const logo = `${import.meta.env.BASE_URL}vite.svg`

/**
 * Dragging the screen, because a phone is a touch device and a mouse is
 * not: without this the frame only scrolls if the cursor happens to be over
 * it and the wheel is used, which is nothing like the thing being shown.
 *
 * A few pixels of movement before it counts as a drag, so a tap on a list
 * item still reaches the item.
 */
const screen = ref<HTMLElement>()
const dragging = ref(false)
let origin = 0
let start = 0

function grab (event: PointerEvent) {
  if (event.button !== 0 || !screen.value) return

  origin = event.clientY
  start = screen.value.scrollTop
  dragging.value = true

  // Capture keeps the drag alive past the frame's edge where it works, and
  // is not worth an exception where it does not.
  try {
    screen.value.setPointerCapture(event.pointerId)
  } catch {}
}

function drag (event: PointerEvent) {
  if (!dragging.value || !screen.value) return

  const moved = event.clientY - origin

  if (Math.abs(moved) > 3) event.preventDefault()

  screen.value.scrollTop = start - moved
}

function release (event: PointerEvent) {
  if (!dragging.value || !screen.value) return

  dragging.value = false

  try {
    screen.value.releasePointerCapture(event.pointerId)
  } catch {}
}

/** Pull-to-refresh hands us a promise and waits for it. */
function refresh ({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) {
  setTimeout(() => {
    snack.value = true
    done('ok')
  }, 900)
}

/** The feed grows as it is scrolled, the way a phone feed does. */
function loadMore ({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) {
  setTimeout(() => {
    loaded.value += 2
    done(loaded.value >= 10 ? 'empty' : 'ok')
  }, 700)
}

const filters = ['all', 'unread', 'mentions', 'saved', 'archived']

const feed = [
  { name: 'Rae Mitchell', text: 'Merged the theme switch — worth a look.', time: '2 m', unread: true },
  { name: 'Tomás Iglesias', text: 'Sepia variant landed in staging.', time: '18 m', unread: true },
  { name: 'Priya Raman', text: 'Can we get the admin density down a notch?', time: '1 h', unread: false },
  { name: 'Jonas Berg', text: 'Contrast audit passed on all nineteen.', time: '3 h', unread: false },
  { name: 'Ines Duarte', text: 'Sketchy is still my favourite. No notes.', time: '5 h', unread: false },
  { name: 'Karl Nowak', text: 'Neon on the status page was a mistake.', time: '8 h', unread: false },
  { name: 'Mei Chen', text: 'Can we get an accent preset for brand purple?', time: 'Yesterday', unread: false },
  { name: 'Ada Okoye', text: 'The pull-to-refresh feels right now.', time: 'Yesterday', unread: false },
  { name: 'Sven Aalto', text: 'Atlas Sepia shipped to the beta group.', time: '2 d', unread: false },
  { name: 'Lea Fournier', text: 'Timeline dots are square in brutalist — nice.', time: '2 d', unread: false },
]

const initials = (name: string) => name.split(' ').map(part => part[0]).join('')
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <div class="d-flex justify-center">
          <!-- The device. A card with a nested layout inside it. -->
          <!-- 360×640: a small handset rather than a large one, because a
               theme that fits here fits anything above it. -->
          <v-card class="mobile" width="360">
            <v-layout class="mobile__layout">
              <!-- The one component that says "phone" before anything else
                   on the screen does. -->
              <v-system-bar absolute>
                <span>9:41</span>
                <v-spacer />
                <v-icon icon="mdi-signal" size="x-small" class="me-1" />
                <v-icon icon="mdi-wifi" size="x-small" class="me-1" />
                <v-icon icon="mdi-battery-70" size="x-small" />
              </v-system-bar>

              <v-app-bar density="comfortable" absolute flat>
                <v-app-bar-nav-icon icon="mdi-menu" />
                <v-app-bar-title>Inbox</v-app-bar-title>
                <v-btn icon="mdi-magnify" />
                <v-btn icon="mdi-dots-vertical" />
              </v-app-bar>

              <v-main class="mobile__main">
                <!-- The scroller is a plain element, not the `v-main`
                     component: a template ref on a component hands back the
                     instance, and `scrollTop` on that is nothing at all. -->
                <div
                  ref="screen"
                  class="mobile__screen"
                  :class="{ 'mobile__screen--dragging': dragging }"
                  @pointerdown="grab"
                  @pointermove="drag"
                  @pointerup="release"
                  @pointercancel="release"
                >
                <!-- Windows swipe on a phone where tabs would on a desktop.
                     No `h-100`: the window would then clip its own content
                     and nothing on the screen could be scrolled to. -->
                <v-window v-model="pane">
                  <v-window-item :value="0">
                    <v-slide-group v-model="filter" class="px-3 py-2" :show-arrows="false" mandatory>
                      <v-slide-group-item
                        v-for="item in filters"
                        :key="item"
                        :value="item"
                        v-slot="{ isSelected, toggle }"
                      >
                        <v-chip
                          :color="isSelected ? 'primary' : undefined"
                          class="me-2 text-capitalize"
                          size="small"
                          @click="toggle"
                        >
                          {{ item }}
                        </v-chip>
                      </v-slide-group-item>
                    </v-slide-group>

                    <v-pull-to-refresh :onLoad="refresh">
                      <v-list lines="two" density="comfortable">
                        <v-list-item
                          v-for="item in feed.slice(0, loaded)"
                          :key="item.name"
                          :title="item.name"
                          :subtitle="item.text"
                        >
                          <template #prepend>
                            <v-avatar color="primary" size="40">{{ initials(item.name) }}</v-avatar>
                          </template>

                          <template #append>
                            <div class="text-right">
                              <div class="text-body-small text-medium-emphasis">{{ item.time }}</div>
                              <v-badge v-if="item.unread" color="primary" dot inline />
                            </div>
                          </template>
                        </v-list-item>

                        <!-- An attachment, which is where a feed meets `v-img`. -->
                        <v-list-item>
                          <v-card class="mb-2" variant="outlined">
                            <v-img :src="logo" height="96" cover class="bg-surface-light" />
                            <v-card-item>
                              <v-card-title class="text-body-medium">brand-mark.svg</v-card-title>
                              <v-card-subtitle>Shared by Tomás · 24 KB</v-card-subtitle>
                            </v-card-item>
                          </v-card>
                        </v-list-item>

                        <v-infinite-scroll :onLoad="loadMore" height="120" side="end">
                          <template #empty>
                            <span class="text-body-small text-medium-emphasis">Nothing older</span>
                          </template>
                        </v-infinite-scroll>
                      </v-list>
                    </v-pull-to-refresh>
                  </v-window-item>

                  <v-window-item :value="2">
                    <div class="pa-4 text-center">
                      <v-avatar size="72" color="primary" class="mb-2">RM</v-avatar>
                      <div class="text-title-medium">Rae Mitchell</div>
                      <div class="text-body-small text-medium-emphasis mb-3">
                        rae@northwind.example
                      </div>
                      <v-btn variant="outlined" size="small" text="Edit profile" />
                    </div>

                    <v-divider />

                    <v-list density="comfortable">
                      <v-list-subheader>Notifications</v-list-subheader>
                      <v-list-item title="Push">
                        <template #append>
                          <v-switch v-model="push" hide-details density="compact" />
                        </template>
                      </v-list-item>
                      <v-list-item title="Email digest">
                        <template #append>
                          <v-switch v-model="digest" hide-details density="compact" />
                        </template>
                      </v-list-item>

                      <v-divider class="my-2" />

                      <v-list-item title="Storage" subtitle="412 MB of 500 MB">
                        <template #append>
                          <v-progress-circular :model-value="82" size="28" width="3" color="primary" />
                        </template>
                      </v-list-item>
                      <v-list-item>
                        <v-date-input
                          v-model="reminder"
                          label="Remind me on"
                          prepend-icon=""
                          prepend-inner-icon="mdi-calendar"
                          hide-details
                        />
                      </v-list-item>

                      <v-list-item title="Help centre" prepend-icon="mdi-lifebuoy" append-icon="mdi-chevron-right" />
                      <v-list-item title="Sign out" prepend-icon="mdi-logout" base-color="error" />
                    </v-list>
                  </v-window-item>

                  <v-window-item :value="1">
                    <div class="pa-4">
                      <p class="text-title-medium mb-1">Verify this device</p>
                      <p class="text-body-small text-medium-emphasis mb-4">
                        We sent a six-digit code to your phone.
                      </p>

                      <v-otp-input v-model="code" length="6" class="mb-4" />

                      <v-btn color="primary" block text="Confirm" @click="snack = true" />
                      <v-btn variant="text" block class="mt-2" text="Send it again" />
                    </div>
                  </v-window-item>
                </v-window>
                </div>
              </v-main>

              <!-- The mobile idiom the other two pages never show. -->
              <v-bottom-navigation v-model="tab" grow absolute>
                <v-btn value="feed" @click="pane = 0">
                  <v-icon icon="mdi-inbox" />
                  Inbox
                </v-btn>
                <v-btn value="verify" @click="pane = 1">
                  <v-icon icon="mdi-shield-check-outline" />
                  Verify
                </v-btn>
                <v-btn value="account" @click="pane = 2">
                  <v-icon icon="mdi-account-circle-outline" />
                  Account
                </v-btn>
                <v-btn value="more" @click="sheet = true">
                  <v-icon icon="mdi-dots-horizontal" />
                  More
                </v-btn>
              </v-bottom-navigation>

              <!-- `absolute` without `app`: inside a nested layout the `app`
                   variant becomes a layout item and stretches across the top
                   instead of floating over the content. -->
              <!-- A speed dial rather than a plain button: on a phone the
                   compose action fans out instead of opening a screen.
                   `v-fab` is the activator, and the dial attaches to the
                   frame so its actions stay inside the handset. -->
              <v-speed-dial
                location="top center"
                transition="slide-y-reverse-transition"
                :attach="true"
                class="mobile__fab"
              >
                <!-- The activator is a button, not a `v-fab`: the fab is a
                     positioning wrapper the size of the frame, so the props
                     would land on the wrapper and the whole screen would
                     open the dial. -->
                <template #activator="{ props: activator }">
                  <v-btn
                    v-bind="activator"
                    icon="mdi-plus"
                    color="primary"
                    size="small"
                    elevation="4"
                    class="mobile__compose"
                  />
                </template>

                <v-btn key="note" icon="mdi-note-plus-outline" size="small" />
                <v-btn key="photo" icon="mdi-image-outline" size="small" />
                <v-btn key="voice" icon="mdi-microphone-outline" size="small" @click="sheet = true" />
              </v-speed-dial>

              <!-- A sheet from the bottom edge, where a desktop opens a menu. -->
              <!-- Not `inset`: that variant sizes the overlay root to 70% of
                   the frame, so the scrim covers only the middle of the
                   phone and the sheet floats in a grey box. A sheet on a
                   phone spans the width anyway. -->
              <v-bottom-sheet v-model="sheet" contained>
                <v-card>
                  <v-list density="comfortable">
                    <v-list-item title="New message" prepend-icon="mdi-pencil-outline" />
                    <v-list-item title="Mark all read" prepend-icon="mdi-email-open-outline" />
                    <v-list-item title="Notification settings" prepend-icon="mdi-bell-cog-outline" />
                    <v-divider class="my-1" />
                    <v-list-item title="Sign out" prepend-icon="mdi-logout" base-color="error" />
                  </v-list>
                </v-card>
              </v-bottom-sheet>

              <v-snackbar v-model="snack" contained timeout="2500">
                Device verified
              </v-snackbar>
            </v-layout>
          </v-card>
        </div>

        <p class="text-body-large text-medium-emphasis mb-6 text-center">
          The same theme on a 360-point handset, where the controls are
          different ones: a bottom bar instead of a drawer, a sheet instead
          of a menu, a code field instead of a form.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/**
 * The frame, and nothing else: the radius is inherited from the card, so a
 * square theme gets a square phone and a round one gets a round phone.
 */
.mobile {
  overflow: hidden;
}

.mobile__layout {
  height: 640px;
  position: relative;
}

.mobile__main {
  overflow: hidden;
}

.mobile__screen {
  height: 100%;
  overflow-y: auto;
  cursor: grab;
  /* The drag moves the scroll position itself, so the browser must not also
     select text while it happens. */
  user-select: none;
  scroll-behavior: auto;
}

.mobile__screen--dragging {
  cursor: grabbing;
}

/* Above the bottom bar, which owns the last 56 points of the frame. */
.mobile__compose {
  position: absolute;
  z-index: 2;
  inset-block-end: 72px;
  inset-inline-end: 16px;
}
</style>
