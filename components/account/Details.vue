<script setup lang="ts">
const props = defineProps<{
  address: string,
  balances: any,
  totalTransactions: string | number,
}>()

const {
  blockchainTooltipData
} = useAppConfig()

const kdaBalance = props.balances.find(({ module }: any) => module === 'coin')
</script>

<template>
  <PageRoot>
    <LabelValue
      col
      withCopy
      label="Account"
      :value="address"
      :description="blockchainTooltipData.account.address"
    />

    <div
      class="grid gap-4 bazk:gap-0 bazk:grid-cols-4"
    >
      <LabelValue
        col
        label="Balance"
        :value="`${kdaBalance?.balance || 0} KDA`"
        :description="blockchainTooltipData.account.balance"
      />

      <LabelValue
        col
        label="Assets"
        :value="balances.length || '0'"
        :description="blockchainTooltipData.account.assets"
      />

      <LabelValue
        col
        label="Transactions"
        :value="totalTransactions"
        :description="blockchainTooltipData.account.transactions"
      />

      <!-- <LabelValue
        col
        label="Created at"
        value="Sep-08-2022 14:18:01"
        :description="blockchainTooltipData.account.createdAt"
      /> -->
    </div>
  </PageRoot>
</template>
