<script setup lang="ts">
/**
 * The four preview colours a theme carries in its meta, drawn as a strip.
 * `block` stretches it across its container — for a card header, say —
 * where the default renders the small inline strip a picker wants.
 */
withDefaults(defineProps<{
  colors: readonly string[]
  width?: number
  height?: number
  block?: boolean
}>(), {
  width: 10,
  height: 20,
  block: false,
})
</script>

<template>
  <span
    class="swatch"
    :class="{ 'swatch--block': block }"
    :style="{ '--swatch-width': `${width}px`, '--swatch-height': `${height}px` }"
  >
    <i v-for="color in colors" :key="color" :style="{ background: color }" />
  </span>
</template>

<style scoped>
.swatch {
  display: inline-flex;
  overflow: hidden;
  border: 1px solid rgba(var(--v-border-color), 0.4);
  border-radius: 3px;
}

.swatch i {
  width: var(--swatch-width);
  height: var(--swatch-height);
}

.swatch--block {
  display: flex;
  border: 0;
  /* Inherit so the card's own radius clips the strip correctly. */
  border-radius: inherit;
  border-end-start-radius: 0;
  border-end-end-radius: 0;
}

.swatch--block i {
  flex: 1 1 0;
  width: auto;
}
</style>
