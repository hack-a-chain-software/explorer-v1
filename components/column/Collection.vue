<script setup lang="ts">
defineProps<{
  name: string,
  icon: string,
}>()
</script>

<template>
  <div
    class="flex items-center gap-4"
  >
    <img
      :src="icon"
      class="w-11 h-11 rounded"
    />

    <ColumnLink
      to="/collections/kadena-bears"
      :label="name"
    />
  </div>
</template>
