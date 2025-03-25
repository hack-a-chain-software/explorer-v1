<script setup lang="ts">
const props = defineProps<{
  payloadHash: string;
  minerData: string;
  outputsHash: string
  transactionsHash: string
}>()

const {
  blockchainTooltipData
} = useAppConfig()

const minerData = useBlockMiner(props.minerData)
</script>

<template>
  <Divide>
    <DivideItem>
      <LabelValue
        label="Miner Account"
        :value="minerData.account"
        :description="blockchainTooltipData.block.payload.minerAccount"
      >
        <template
          #value
        >
          <div
            class="flex gap-2"
          >
            <ValueLink
              :label="minerData.account"
              :value="minerData.account"
              :to="`/account/${minerData.account}`"
            />

            <Copy
              :value="minerData.account"
            />
          </div>
        </template>
      </LabelValue>

      <LabelValue
        label="Miner Public Keys"
        :value="JSON.stringify(minerData['public-keys'])"
        :description="blockchainTooltipData.block.payload.minerPublicKeys"
      />

      <LabelValue
        label="Miner Predicate"
        :value="minerData.predicate"
        :description="blockchainTooltipData.block.payload.minerPredicate"
      />
    </DivideItem>

    <DivideItem>
      <LabelValue
        label="Transactions Hash"
        :value="transactionsHash"
        :description="blockchainTooltipData.block.payload.transactionsHash"
      />

      <LabelValue
        label="Outputs Hash"
        :value="outputsHash"
        :description="blockchainTooltipData.block.payload.outputsHash"
      />

      <LabelValue
        label="Payload Hash"
        :value="payloadHash"
        :description="blockchainTooltipData.block.payload.payloadHash"
      />
    </DivideItem>
  </Divide>
</template>
