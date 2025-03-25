<script setup lang="ts">
const props = defineProps<{
  coinbase: string
}>()

const coinbase = useBlockMiner(props.coinbase)
</script>

<template>
  <span>
    {{ coinbase.events[0].params[2].toFixed(4) }}
  </span>
</template>
