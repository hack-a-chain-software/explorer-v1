<script setup lang="ts">
const props = defineProps<{
  ttl: string,
  data?: string,
  code:  any,
  nonce: string,
  sender: string,
  chainId: number,
  gaslimit: string,
  createdAt: string,
}>()

const {
  blockchainTooltipData
} = useAppConfig()

const pubkey = useTransactionPubkey(props.data)
</script>

<template>
  <Divide>
    <DivideItem>
      <LabelValue
        withCopy
        label="Sender"
        :value="sender"
        :description="blockchainTooltipData.transaction.meta.sender"
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

      <LabelValue
        label="Chain"
        :value="String(chainId)"
        :description="blockchainTooltipData.transaction.meta.chain"
      />

      <LabelValue
        label="Gas limit"
        :value="gaslimit"
        :description="blockchainTooltipData.transaction.meta.gasLimit"
      />

      <LabelValue
        label="TTL"
        :value="ttl"
        :description="blockchainTooltipData.transaction.meta.ttl"
      />

      <LabelValue
        label="Creation Time"
        :value="createdAt"
        :description="blockchainTooltipData.transaction.meta.creationTime"
      />
    </DivideItem>

    <DivideItem
      v-if="pubkey"
    >
      <LabelValue
        withCopy
        label="Public Key"
        :value="pubkey"
        :description="blockchainTooltipData.transaction.meta.publicKey"
      />
    </DivideItem>

    <DivideItem>
      <LabelValue
        label="Nonce"
        :value="nonce"
        :description="blockchainTooltipData.transaction.meta.nonce"
      />

      <LabelValue
        label="Data"
        :description="blockchainTooltipData.transaction.meta.data"
      >
        <template #value>
          <Code :value="JSON.parse(data)" />
        </template>
      </LabelValue>
    </DivideItem>
  </Divide>
</template>
