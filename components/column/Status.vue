<script setup lang="ts">
const props = defineProps<{
  row: any,
}>()

const variant = computed(() => {
  return props.row.result.includes('success') ? 'success' : 'failed'
})

const label = computed(() => {
  return props.row.result.includes('success') ? 'Success' : 'Finalized'
})
</script>

<template>
  <Tag
    :label="label"
    :variant="variant"
  />
</template>
