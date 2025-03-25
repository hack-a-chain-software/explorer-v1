<script setup lang="ts">
defineProps<{
  blocks: any,
}>()
</script>

<template>
  <div
    class="flex flex-col"
  >
    <div
      class="pb-2"
    >
      <span
        class="text-white text-sm"
      >
        Blocks
      </span>
    </div>

    <SearchViewBlockItem
      v-bind="block"
      class="py-3"
      :key="'block:'+block.id"
      v-for="(block, i) in blocks"
      :class="[!((i + 1) === blocks.length) && '!border-b border-b-gray-300']"
    />
  </div>
</template>
