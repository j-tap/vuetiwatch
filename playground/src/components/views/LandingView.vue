<script setup lang="ts">
import { ref } from 'vue'

/**
 * A landing page of the ordinary kind — hero, proof, features, pricing,
 * a quote and a closing call — built from plain Vuetify components with no
 * colour, radius or shadow written here. Everything it looks like comes
 * from the theme, which is the point: a palette can pass a component wall
 * and still fall apart on a page that has to persuade someone.
 */
const faq = ref<number>()
const tour = ref(false)
const email = ref('')
const quote = ref(0)
const rating = ref(5)

const quotes = [
  {
    text: 'We switched the whole console to a dark theme on a Friday. Nobody filed a single ticket about it on Monday.',
    name: 'Rae Mitchell',
    role: 'Head of Design, Halcyon',
    initials: 'RM',
  },
  {
    text: 'Our design system was three people and a spreadsheet. Now it is one import and an argument we no longer have.',
    name: 'Tomás Iglesias',
    role: 'Staff Engineer, Northwind',
    initials: 'TI',
  },
  {
    text: 'The admin theme paid for itself the week we shipped it. Support tickets about "where is the button" went to zero.',
    name: 'Priya Raman',
    role: 'Product Lead, Meridian',
    initials: 'PR',
  },
]

const shots = [
  { title: 'Component wall', icon: 'mdi-view-grid-outline', note: 'Every control, one page' },
  { title: 'Admin panel', icon: 'mdi-view-dashboard-outline', note: 'Tables, filters, forms' },
  { title: 'Mobile app', icon: 'mdi-cellphone', note: 'The same theme at 360 points' },
]

const integrations = [
  { name: 'Vue', icon: 'mdi-vuejs' },
  { name: 'Nuxt', icon: 'mdi-nuxt' },
  { name: 'Vite', icon: 'mdi-flash-outline' },
  { name: 'TypeScript', icon: 'mdi-language-typescript' },
  { name: 'GitHub', icon: 'mdi-github' },
  { name: 'npm', icon: 'mdi-npm' },
]

const steps = [
  { n: '01', title: 'Install', text: 'One package, no peer dependencies beyond Vuetify itself.' },
  { n: '02', title: 'Register', text: 'Hand the themes to createVuetify and the plugin to the app.' },
  { n: '03', title: 'Switch', text: 'Change the name at runtime and the whole page follows.' },
]

const numbers = [
  { value: '19', label: 'themes in the box' },
  { value: '14 kB', label: 'gzipped, all of them' },
  { value: '4.5:1', label: 'minimum contrast' },
  { value: '0', label: 'runtime dependencies' },
]

const matrix = [
  { feature: 'Colour palette', plain: true, vuetiwatch: true },
  { feature: 'Radius, borders, density', plain: false, vuetiwatch: true },
  { feature: 'Component defaults per theme', plain: false, vuetiwatch: true },
  { feature: 'Motion and focus tokens', plain: false, vuetiwatch: true },
  { feature: 'Switch without a rebuild', plain: false, vuetiwatch: true },
]

const features = [
  {
    icon: 'mdi-palette-swatch-outline',
    title: 'One import, many looks',
    text: 'Themes are plain ThemeDefinitions plus a stylesheet, so a switch costs a name, not a rebuild.',
  },
  {
    icon: 'mdi-speedometer',
    title: 'Weighs almost nothing',
    text: 'The whole set is a few kilobytes gzipped, and shipping one theme is a fraction of that.',
  },
  {
    icon: 'mdi-check-decagram-outline',
    title: 'Measured, not guessed',
    text: 'Every filled control clears 4.5:1, and every theme is checked against the same page.',
  },
]

const tiers = [
  {
    name: 'Free',
    price: '$0',
    note: 'for open source',
    features: ['All nineteen themes', 'Light and dark variants', 'MIT licensed'],
    cta: 'Start now',
    variant: 'outlined' as const,
  },
  {
    name: 'Team',
    price: '$29',
    note: 'per month',
    features: ['Everything in Free', 'Accent presets', 'Priority issues', 'Private themes'],
    cta: 'Choose Team',
    variant: 'flat' as const,
    featured: true,
  },
  {
    name: 'Company',
    price: 'Talk to us',
    note: 'annual',
    features: ['Everything in Team', 'Design review', 'Migration help'],
    cta: 'Contact sales',
    variant: 'outlined' as const,
  },
]

const questions = [
  {
    q: 'Does it work with an existing app?',
    a: 'It layers over Vuetify rather than replacing anything: your own defaults are preserved, and a component keeps whatever props you passed it.',
  },
  {
    q: 'Can I ship only one theme?',
    a: 'Yes. Import the core stylesheet and the one theme file, and hand the plugin a single theme.',
  },
  {
    q: 'What about dark mode?',
    a: 'Several themes come as families — a light, a dark and a warm variant sharing one design — and switching between them is one call.',
  },
]
</script>

<template>
  <!-- The strip every product site has, and the one place a theme's banner
       treatment shows on a page rather than in a component list. -->
  <v-banner
    icon="mdi-party-popper"
    text="Atlas Sepia is out — a warm-paper variant for people who find white panels bright."
    lines="one"
  >
    <template #actions>
      <v-btn text="See it" />
    </template>
  </v-banner>

  <!-- Hero -->
  <section class="py-12 py-md-16">
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="6">
          <v-chip class="mb-4" size="small" prepend-icon="mdi-tag-outline">
            v1.0 is out
          </v-chip>

          <h1 class="text-display-small text-md-display-medium mb-4">
            Ship a product that looks like someone chose how it looks
          </h1>

          <p class="text-body-large text-medium-emphasis mb-6">
            Nineteen themes for Vuetify 4 that differ in more than colour —
            radius, density, motion and type all move together, and every one
            of them is one line to switch.
          </p>

          <div class="d-flex flex-wrap ga-3 mb-6">
            <v-btn color="primary" size="large" text="Get started" />
            <v-btn
              variant="tonal"
              size="large"
              prepend-icon="mdi-play-circle-outline"
              text="Watch the tour"
              @click="tour = true"
            />
          </div>

          <div class="d-flex align-center ga-2 text-body-small text-medium-emphasis">
            <v-icon icon="mdi-check" size="small" />
            <span>No account needed</span>
            <v-divider vertical class="mx-2" />
            <v-icon icon="mdi-check" size="small" />
            <span>MIT licensed</span>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <!-- A product shot, drawn from the same components as the rest. -->
          <v-card>
            <v-toolbar density="compact">
              <v-toolbar-title class="text-body-large">Revenue</v-toolbar-title>
              <v-spacer />
              <v-btn icon="mdi-dots-horizontal" size="small" />
            </v-toolbar>

            <v-card-text>
              <div class="d-flex align-end ga-4 mb-4">
                <div>
                  <div class="text-headline-medium">$48,214</div>
                  <div class="text-body-small text-medium-emphasis">this month</div>
                </div>
                <v-chip color="success" size="small" prepend-icon="mdi-trending-up">
                  +12.4%
                </v-chip>
              </div>

              <v-sparkline
                :model-value="[6, 11, 8, 15, 12, 19, 16, 24, 21, 28]"
                line-width="3"
                smooth
                auto-draw
                color="primary"
              />
            </v-card-text>

            <v-divider />

            <v-list density="compact">
              <v-list-item
                v-for="row in [['Subscriptions', '$31,020'], ['One-off', '$12,540'], ['Services', '$4,654']]"
                :key="row[0]"
                :title="row[0]"
              >
                <template #append>
                  <span class="text-body-small">{{ row[1] }}</span>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <v-divider />

  <!-- Proof -->
  <section class="py-8">
    <v-container>
      <div class="d-flex flex-wrap align-center justify-center ga-3 mb-4">
        <v-rating v-model="rating" density="compact" size="small" readonly half-increments />
        <span class="text-body-small text-medium-emphasis">4.9 from 120 reviews</span>
      </div>

      <p class="text-label-medium text-medium-emphasis text-center mb-4">
        Trusted by teams shipping with Vue
      </p>
      <div class="d-flex flex-wrap justify-center ga-8 text-title-medium text-medium-emphasis">
        <span v-for="name in ['Northwind', 'Halcyon', 'Meridian', 'Ardent', 'Foxglove']" :key="name">
          {{ name }}
        </span>
      </div>
    </v-container>
  </section>

  <!-- Figures -->
  <section class="py-8">
    <v-container>
      <v-row>
        <v-col v-for="item in numbers" :key="item.label" cols="6" md="3" class="text-center">
          <div class="text-headline-medium">{{ item.value }}</div>
          <div class="text-body-small text-medium-emphasis">{{ item.label }}</div>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- Features -->
  <section class="py-12">
    <v-container>
      <h2 class="text-headline-medium mb-2">Everything a theme should carry</h2>
      <p class="text-body-large text-medium-emphasis mb-8">
        And nothing an application should have to write itself.
      </p>

      <v-row>
        <v-col v-for="feature in features" :key="feature.title" cols="12" md="4">
          <v-card class="h-100">
            <v-card-item>
              <v-icon :icon="feature.icon" color="primary" size="32" class="mb-2" />
              <v-card-title>{{ feature.title }}</v-card-title>
            </v-card-item>
            <v-card-text class="text-medium-emphasis">{{ feature.text }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- How it works -->
  <section class="py-12">
    <v-container>
      <h2 class="text-headline-medium mb-8">Three steps, none of them a rebuild</h2>

      <v-row>
        <v-col v-for="step in steps" :key="step.n" cols="12" md="4">
          <div class="d-flex ga-4">
            <div class="text-headline-medium text-medium-emphasis">{{ step.n }}</div>
            <div>
              <h3 class="text-title-large mb-1">{{ step.title }}</h3>
              <p class="text-body-medium text-medium-emphasis mb-0">{{ step.text }}</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- Gallery: the image slots a marketing page is mostly made of, drawn
       as placeholders so the theme has to carry them rather than a photo. -->
  <section class="py-12">
    <v-container>
      <div class="d-flex flex-wrap align-end justify-space-between ga-4 mb-6">
        <div>
          <h2 class="text-headline-medium mb-1">See it on real screens</h2>
          <p class="text-body-medium text-medium-emphasis mb-0">
            The same markup, three contexts, nineteen themes.
          </p>
        </div>
        <v-btn variant="text" append-icon="mdi-arrow-right" text="Open the playground" />
      </div>

      <v-row>
        <v-col v-for="shot in shots" :key="shot.title" cols="12" md="4">
          <v-card>
            <v-responsive :aspect-ratio="16 / 10">
              <v-sheet
                color="surface-light"
                class="h-100 d-flex flex-column align-center justify-center ga-2"
              >
                <v-icon :icon="shot.icon" size="40" class="text-medium-emphasis" />
                <span class="text-body-small text-medium-emphasis">{{ shot.note }}</span>
              </v-sheet>
            </v-responsive>

            <v-card-item>
              <v-card-title class="text-body-large">{{ shot.title }}</v-card-title>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- Integrations -->
  <section class="py-8">
    <v-container>
      <p class="text-label-medium text-medium-emphasis text-center mb-6">
        Fits what you already run
      </p>

      <div class="d-flex flex-wrap justify-center ga-6">
        <div
          v-for="item in integrations"
          :key="item.name"
          class="d-flex flex-column align-center ga-2"
          style="width: 96px"
        >
          <v-avatar :size="48" color="surface-light">
            <v-icon :icon="item.icon" size="24" />
          </v-avatar>
          <span class="text-body-small text-medium-emphasis">{{ item.name }}</span>
        </div>
      </div>
    </v-container>
  </section>

  <!-- Pricing -->
  <section class="py-12">
    <v-container>
      <h2 class="text-headline-medium text-center mb-2">Simple pricing</h2>
      <p class="text-body-large text-medium-emphasis text-center mb-8">
        Free while you are deciding. Paid when it is carrying your product.
      </p>

      <v-row>
        <v-col v-for="tier in tiers" :key="tier.name" cols="12" md="4">
          <!-- Marketing cards carry more air than application ones: this is
               the one place on the page where the padding is the message. -->
          <v-card
            :color="tier.featured ? 'primary' : undefined"
            :variant="tier.variant"
            class="h-100 pa-4 pa-md-6"
          >
            <v-card-item>
              <v-card-title>{{ tier.name }}</v-card-title>
              <v-card-subtitle>{{ tier.note }}</v-card-subtitle>
            </v-card-item>

            <v-card-text>
              <div class="text-headline-large mb-4">{{ tier.price }}</div>

              <!-- Plain rows rather than a list: a feature line is a sentence
                   and a list item truncates it to one line. -->
              <div v-for="item in tier.features" :key="item" class="d-flex ga-3 mb-2">
                <v-icon icon="mdi-check" size="small" />
                <span class="text-body-medium">{{ item }}</span>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                :variant="tier.featured ? 'flat' : 'outlined'"
                :color="tier.featured ? 'surface' : 'primary'"
                :text="tier.cta"
                block
              />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- What you get over a plain palette -->
  <section class="py-12">
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="5">
          <h2 class="text-headline-medium mb-2">More than a palette</h2>
          <p class="text-body-medium text-medium-emphasis mb-4">
            A `ThemeDefinition` can carry colours and fonts. Everything else
            that makes two themes look unrelated has to come from somewhere.
          </p>
          <v-btn variant="outlined" append-icon="mdi-arrow-right" text="Read the docs" />
        </v-col>

        <v-col cols="12" md="7">
          <v-card>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Carried by</th>
                  <th class="text-center">A palette</th>
                  <th class="text-center">Vuetiwatch</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in matrix" :key="row.feature">
                  <td>{{ row.feature }}</td>
                  <td class="text-center">
                    <v-icon
                      :icon="row.plain ? 'mdi-check' : 'mdi-minus'"
                      :color="row.plain ? 'success' : undefined"
                      size="small"
                    />
                  </td>
                  <td class="text-center">
                    <v-icon icon="mdi-check" color="success" size="small" />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- Quotes -->
  <section class="py-12">
    <v-container>
      <v-carousel
        v-model="quote"
        :show-arrows="false"
        height="260"
        hide-delimiter-background
        cycle
        interval="6000"
      >
        <v-carousel-item v-for="item in quotes" :key="item.name">
          <v-card variant="tonal" class="pa-6 pa-md-8 h-100 d-flex flex-column justify-center">
            <blockquote class="text-headline-small mb-6">“{{ item.text }}”</blockquote>

            <div class="d-flex align-center ga-3">
              <v-avatar color="primary">{{ item.initials }}</v-avatar>
              <div>
                <div class="text-body-large">{{ item.name }}</div>
                <div class="text-body-small text-medium-emphasis">{{ item.role }}</div>
              </div>
            </div>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </section>

  <!-- Questions -->
  <section class="py-12">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h2 class="text-headline-medium mb-2">Questions</h2>
          <p class="text-body-medium text-medium-emphasis">
            The three that arrive most often.
          </p>
        </v-col>

        <v-col cols="12" md="8">
          <v-expansion-panels v-model="faq">
            <v-expansion-panel v-for="item in questions" :key="item.q" :title="item.q" :text="item.a" />
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <!-- Sign-up -->
  <section class="py-8">
    <v-container>
      <v-card variant="tonal" class="pa-6">
        <v-row align="center">
          <v-col cols="12" md="6">
            <h3 class="text-title-large mb-1">Release notes, once a month</h3>
            <p class="text-body-medium text-medium-emphasis mb-0">
              New themes and breaking changes. Nothing else.
            </p>
          </v-col>

          <v-col cols="12" md="6">
            <div class="d-flex ga-2">
              <v-text-field
                v-model="email"
                label="Work email"
                hide-details
                class="flex-1-1"
              />
              <v-btn color="primary" size="large" text="Subscribe" />
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </section>

  <!-- The tour, in a dialog: overlays are the one surface a theme cannot
       show on a page, and every theme treats them differently. -->
  <v-dialog v-model="tour" max-width="640">
    <v-card>
      <v-card-item>
        <v-card-title>A two-minute tour</v-card-title>
        <v-card-subtitle>What changes when a theme changes</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-sheet
          class="d-flex align-center justify-center mb-4"
          height="220"
          rounded
          border
        >
          <v-btn icon="mdi-play" size="large" color="primary" />
        </v-sheet>

        <p class="text-body-medium text-medium-emphasis mb-0">
          Radius, density, motion, icons and component defaults all move with
          the palette — this dialog included.
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text="Close" @click="tour = false" />
        <v-btn color="primary" variant="flat" text="Get started" @click="tour = false" />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Closing call -->
  <section class="py-12 py-md-16">
    <v-container>
      <v-card color="primary" class="pa-6 pa-md-10 text-center">
        <h2 class="text-headline-medium mb-3">Pick a theme and see</h2>
        <p class="text-body-large mb-6">
          Switch it in the bar above — this page repaints without a reload.
        </p>
        <v-btn color="surface" size="large" text="Install the package" />
      </v-card>
    </v-container>
  </section>
</template>
