<script setup lang="ts">
defineProps<{
  value: string,
  chars?: number,
}>()

function shortenAddress (
  address: string,
  chars = 5
): string {
  return `${address.slice(0, chars)}...${address.slice(
    -chars
  )}`
}
</script>

<template>
  <ColumnLink
    withCopy
    :value="value"
    :to="`/account/${value}`"
    :label="shortenAddress(value, chars || 6)"
  />
</template>
