<script setup lang="ts">
defineProps<{
  columns: any
}>()
</script>

<template>
  <div
    v-for="row in 20"
    :key="`table-skeleton-row-${row}`"
    class="grid grid-cols-[repeat(24,minmax(0,1fr))] px-4 py-2 gap-4 border-b border-b-gray-300 justify-between"
  >
    <div
      :key="index"
      class="h-[28px] flex items-center justify-center"
      v-for="(column, index) in columns"
      :style="{ gridColumn: `span ${column.cols} / span ${column.cols}` }"
    >
      <div
        class="h-[20px] bg-gray-200 rounded pulse w-full"
      />
    </div>
  </div>
</template>
