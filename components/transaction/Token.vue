<script setup lang="ts">
const props = defineProps<{
  amount: string,
  modulename: string,
  contract: any
}>()

const {
  blockchainTooltipData
} = useAppConfig();

const metadata = computed(() => {
  return staticTokens.find(({ module }) => module === props.contract.module) || unknownToken
})
</script>

<template>
  <LabelValue
    label="Amount"
    :value="`${amount} ${metadata.symbol || modulename}`"
    :description="blockchainTooltipData.transaction.overview.amount"
  />
</template>
