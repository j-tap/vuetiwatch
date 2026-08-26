<script setup lang="ts">
/**
 * One block of the demo page: an anchor the drawer can jump to, a heading
 * and a rule that carries the eye across to the next block.
 *
 * Deliberately not a card. Themes style `.v-card` heavily — glass, relief,
 * hand-drawn borders — and the sections are full of cards themselves, so a
 * surface here would nest one treatment inside another.
 */
defineProps<{
  id: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <section :id="id" class="demo-section">
    <header class="demo-section__header">
      <div>
        <!-- A real heading tag, so themes that set --v-font-heading show it. -->
        <h2 class="text-headline-small text-md-headline-medium">{{ title }}</h2>
        <p v-if="subtitle" class="text-body-small text-medium-emphasis mb-0">
          {{ subtitle }}
        </p>
      </div>

      <v-divider class="demo-section__rule d-none d-sm-block" />
    </header>

    <slot />
  </section>
</template>

<style scoped>
.demo-section__header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-block-end: 20px;
}

/* The rule takes whatever the heading leaves, at every width. */
.demo-section__rule {
  flex: 1 1 auto;
}
</style>
