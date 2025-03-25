<script setup lang="ts">
defineProps<{
  to?: string;
  withCopy?: boolean;
  value?: string | number;
  label: string | number;
  withouMax?: boolean;
}>()
</script>

<template>
  <ValueLink
    :withCopy="withCopy"
    :to="to"
    :label="label"
    :value="value || label"
    :class="!withouMax && '!max-w-[270px]'"
  />
</template>
