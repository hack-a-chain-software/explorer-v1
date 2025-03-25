<script setup lang="ts">
defineProps<{
  delta?: number,
}>()
</script>

<template>
  <span
    class="text-sm font-semibold"
    :class="(delta || 0) <= 0 ? 'text-system-red' : 'text-system-green'"
  >
   {{ delta ? delta.toFixed(2) : '0' }}%
  </span>
</template>
