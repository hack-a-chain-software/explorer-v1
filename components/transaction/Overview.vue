<script setup lang="ts">
const props = defineProps<{
  code: any;
  result: string,
  sender: string,
  chainId: number,
  gasprice: string,
  createdAt: string,
  requestkey: string,
  continuation: string;
  transfers: any
}>()

const {
  blockchainTooltipData
} = useAppConfig();
</script>

<template>
  <Divide>
    <DivideScroll
      class="max-h-[360px]"
      v-if="transfers?.length > 0"
    >
      <div
        class="grid gap-2"
        v-for="{ transfer, contract } in transfers"
        :key="'transfer:' + transfer.id"
      >
        <LabelValue
          withCopy
          label="From"
          :value="transfer.fromAcct"
          :description="blockchainTooltipData.transaction.overview.from"
        >
          <template
            #value
          >
            <div
              class="flex gap-2"
            >
              <ValueLink
                :label="transfer.fromAcct"
                :value="transfer.fromAcct"
                :to="`/account/${transfer.fromAcct}`"
              />

              <Copy
                :value="transfer.fromAcct"
              />
            </div>
          </template>
        </LabelValue>

        <LabelValue
          withCopy
          label="To"
          :value="transfer.toAcct"
          :description="blockchainTooltipData.transaction.overview.to"
        >
          <template
            #value
          >
            <div
              class="flex gap-2"
            >
              <ValueLink
                :label="transfer.toAcct"
                :value="transfer.toAcct"
                :to="`/account/${transfer.toAcct}`"
              />

              <Copy
                :value="transfer.toAcct"
              />
            </div>
          </template>
        </LabelValue>

        <TransactionNFT
          v-if="transfer.type === 'poly-fungible'"
          :contract="contract"
        />

        <TransactionToken
          v-else
          v-bind="transfer"
          :contract="contract"
        />
      </div>
    </DivideScroll>

    <DivideItem>
      <LabelValue
        label="Transaction Fee"
        :value="`${gasprice} KDA`"
        :description="blockchainTooltipData.transaction.overview.transactionFee"
      />

      <LabelValue
        withCopy
        label="Paid by"
        :value="sender"
        :description="blockchainTooltipData.transaction.overview.paidBy"
      >
        <template
          #value
        >
          <div
            class="flex gap-2"
          >
            <ValueLink
              :label="sender"
              :value="sender"
              :to="`/account/${sender}`"
            />

            <Copy
              :value="sender"
            />
          </div>
        </template>
      </LabelValue>
    </DivideItem>

    <DivideItem>
      <LabelValue
        label="Gas Price"
        :value="`${gasprice} KDA`"
        :description="blockchainTooltipData.transaction.overview.gasPrice"
      />
    </DivideItem>

    <DivideItem>
      <LabelValue
        label="Code"
        :withCopy="true"
        :valueCopy="code"
        :description="blockchainTooltipData.transaction.overview.code"
      >
        <template #value>
          <div
            class="flex gap-2"
          >
            <HighlightValue>
              {{ code }}
            </HighlightValue>

            <Copy
              :value="code"
            />
          </div>
        </template>
      </LabelValue>
    </DivideItem>
  </Divide>
</template>
