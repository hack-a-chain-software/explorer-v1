<script setup lang="ts">
const props = defineProps<{
  minerData: string,
}>()

const miner = useBlockMiner(props.minerData)
</script>

<template>
  <ColumnLink
    withCopy
    :value="miner.account"
    :to="`/account/${miner.account}`"
    :label="shortenAddress(miner.account, 6)"
  />
</template>
