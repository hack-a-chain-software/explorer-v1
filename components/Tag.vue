<script setup lang="ts">
defineProps<{
  label: string,
  variant: 'success' | 'failed',
}>()

const rootColor = {
  failed: 'bg-[#290F10] border-[#541E20]',
  success: 'bg-[#0D2516] border-[#194D2D]'
}

const labelColor = {
  failed: 'text-system-red',
  success: 'text-system-green'
}
</script>

<template>
  <div
    :class="[
      rootColor[variant]
    ]"
    class="px-2 py-1 rounded border w-max"
  >
    <span
      :class="[
        labelColor[variant]
      ]"
      class="text-xs font-semibold leading-[150%] block"
    >
      {{ label }}
    </span>
  </div>
</template>
