<script setup lang="ts">
defineProps<{
  value: string
}>()
</script>

<template>
  <span
    class="text-sm font-semibold text-system-green h-[37px] flex items-center"
  >
    {{ value }}
  </span>
</template>
