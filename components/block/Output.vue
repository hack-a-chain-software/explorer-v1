<script setup lang="ts">
const props = defineProps<{
  coinbase: string
}>()

const {
  blockchainTooltipData
} = useAppConfig()

const coinbase = useBlockMiner(props.coinbase)
</script>

<template>
  <PageRoot>
    <LabelValue
      label="Gas"
      :value="coinbase.gas + ''"
      :description="blockchainTooltipData.block.coinbase.gas"
    />

    <LabelValue
      label="Result"
      value="-"
      :description="blockchainTooltipData.block.coinbase.result"
    >
      <template #value>
        <div
          class="flex items-center gap-2"
        >
          <IconSuccess
            class="w-6 h-6"
          />

          <span>
            Write Succeeded
          </span>
        </div>
      </template>
    </LabelValue>

    <LabelValue
      :value="coinbase.reqKey"
      label="Request Key"
      :description="blockchainTooltipData.block.coinbase.requestKey"
    />

    <LabelValue
      :value="coinbase.logs"
      label="Logs"
      :description="blockchainTooltipData.block.coinbase.logs"
    />

    <LabelValue
      :value="coinbase.metaData + ''"
      label="Metadata"
      :description="blockchainTooltipData.block.coinbase.metadata"
    />

    <LabelValue
      :value="coinbase.txId"
      label="Transaction ID"
      :description="blockchainTooltipData.block.coinbase.transactionId"
    />
  </PageRoot>
</template>
