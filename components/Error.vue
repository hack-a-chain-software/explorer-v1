<script setup lang="ts">
defineProps<{
  error?: any,
}>();
</script>

<template>
  <TableContainer>
    <div
      class="pb-4"
    >
      <span
        class="text-font-400 text-md font-bold"
      >
        Server Error
      </span>
    </div>

    <span
      class="text-font-400"
    >
      {{ error?.message }}
    </span>
  </TableContainer>
</template>
