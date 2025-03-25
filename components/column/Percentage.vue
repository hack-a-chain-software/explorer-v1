<script setup lang="ts">
defineProps<{
  value: number,
}>()
</script>

<template>
  <div
    class="w-full flex flex-col gap-1 h-[26px]"
  >
    <div>
      <span
        class="text-sm text-font-400 block h-[19px]"
      >
        {{ Math.round(value * 100) }}%
      </span>
    </div>

    <div
      class="w-full rounded-full bg-gray-100 h-[2px]"
    >
      <div
        :style="{ width: `${value * 100}%`}"
        class="h-full rounded-full bg-kadscan-500"
      />
    </div>
  </div>
</template>
