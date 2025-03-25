<script setup lang="ts">
defineProps<{
  amount: string | number,
  dollar?: string | number,
}>()
</script>

<template>
  <div
    class="flex flex-col uppercase"
  >
    <span
      class="text-sm text-font-400"
    >
      {{ amount  }}
    </span>

    <span
      class="text-xs text-font-500 font-semibold leading-[150%] block"
    >
      {{ dollar }}
    </span>
  </div>
</template>
