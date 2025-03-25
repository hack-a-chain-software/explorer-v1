<script setup lang="ts">
defineProps<{
  label?: number,
  delta?: number,
}>()
</script>

<template>
  <div
    class="flex gap-2 items-left"
  >
    <span
      class="text-sm text-font-400"
    >
      {{ label ? customMoney(label) : '-' }}
    </span>
    <div
      v-if="delta"
      class="px-2 py-1 bg-gray-900 rounded"
    >
      <span
        class="text-xs block font-semibold"
        :class="delta < 0 ? 'text-system-red' : 'text-system-green'"
      >
        {{ delta.toFixed(2) }}%
      </span>
    </div>
  </div>
</template>
