<script setup lang="ts">
const props = defineProps<{
  contract: any
}>()

const {
  blockchainTooltipData
} = useAppConfig()

const nft = useNft(props.contract)
</script>

<template>
  <LabelValue
    label="NFT"
    :description="blockchainTooltipData.transaction.overview.amount"
  >
    <template
      #value
    >
      <NuxtLink
        :to="contract ? `/nfts/${contract.id}` : ''"
        class="flex gap-2 items-center block"
      >
        <div
          class="
            w-full
            rounded-lg
            aspect-square
            max-w-[44px]
            min-w-[44px]
            overflow-hidden border-[3px] border-gray-800 flex justify-center items-center"
        >
          <NftImage
            :image="nft.image"
            classRoot="aspect-square max-w-[44px] bg-gray-200 pulse w-full shrink-0"
          />
        </div>

        <div>
          <span
            class="text-font-400 text-sm fix flex gap-2 whitespace-nowrap"
          >
            {{ nft.name }}
          </span>
        </div>
      </NuxtLink>
    </template>
  </LabelValue>
</template>
