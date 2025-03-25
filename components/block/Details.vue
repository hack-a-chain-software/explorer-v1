<script setup lang="ts">
defineProps<{
  hash: string;
  height: number;
  parent: string;
  chainId: number;
  createdAt: string;
  payloadHash: string;
}>()

const {
  blockchainTooltipData
} = useAppConfig()
</script>

<template>
  <PageRoot>
    <LabelValue
      :value="height"
      label="Block Height"
      :description="blockchainTooltipData.block.blockHeight"
    />

    <LabelValue
      label="Chain"
      :value="chainId + ''"
      :description="blockchainTooltipData.block.chain"
    />

    <LabelValue
      label="Creation Time"
      :value="new Date(createdAt).toUTCString()"
      :description="blockchainTooltipData.block.creationTime"
    />

    <LabelValue
      withCopy
      label="Parent"
      :value="parent"
      :description="blockchainTooltipData.block.parent"
    />

    <LabelValue
      label="POW Hash"
      :value="payloadHash"
      :description="blockchainTooltipData.block.powHash"
    />
  </PageRoot>
</template>
