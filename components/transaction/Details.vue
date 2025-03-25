<script setup lang="ts">
const props = defineProps<{
  result: string;
  blockId: number;
  chainId: number;
  createdAt: string;
  requestkey: string;
  blockByBlockId?: any;
}>()

const status = useTransactionStatus(props.result)

const {
  blockchainTooltipData
} = useAppConfig()
</script>

<template>
  <PageRoot>
    <LabelValue
      withCopy
      label="Request Key"
      :value="requestkey"
      :description="blockchainTooltipData.transaction.requestKey"
    />

    <LabelValue
      label="Status"
      :description="blockchainTooltipData.transaction.status"
    >
      <template
        #value
      >
        <ColumnStatus
          :row="{ result: status }"
        />
      </template>
    </LabelValue>

    <LabelValue
      label="Chain"
      :value="String(chainId)"
      :description="blockchainTooltipData.transaction.chain"
    />

    <LabelValue
      label="Block Height"
      :description="blockchainTooltipData.transaction.blockHeight"
    >
      <template
        #value
      >
        <ValueLink
          :label="blockId"
          :value="blockId"
          :to="blockByBlockId ? `/blocks/chain/${chainId}/height/${blockByBlockId.height}` : ''"
        />
      </template>
    </LabelValue>

    <LabelValue
      label="Timestamp"
      :value="new Date(createdAt).toUTCString()"
      :description="blockchainTooltipData.transaction.timestamp"
    />
  </PageRoot>
</template>
