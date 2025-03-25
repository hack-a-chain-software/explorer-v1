<script setup lang="ts">
defineProps<{
  label: string,
  amount: string,
  conversion: string,
}>()

</script>

<template>
  <div
    class="w-full flex flex-col gap-2 rounded-lg p-6 bg-gray-700"
  >
    <div>
      <span
        class="flex text-sm text-font-500 font-medium"
      >
        {{ label }}
      </span>
    </div>

    <div
      class="flex items-end gap-2"
    >
      <span
        class="text-2xl font-semibold text-font-400"
      >
        {{ amount }}
      </span>

      <span
        class="text-lg font-medium text-font-500"
      >
        {{ conversion }}
      </span>
    </div>
  </div>
</template>
