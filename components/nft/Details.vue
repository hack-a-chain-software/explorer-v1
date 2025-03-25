<script setup lang="ts">
const props = defineProps<{
  contract?: any,
}>()

const {
  blockchainTooltipData
} = useAppConfig()

const nft = useNft(props.contract)
</script>

<template>
  <div
    class="rounded-lg md:rounded-2xl overflow-hidden bg-gray-800 flex flex-col md:flex-row"
  >
    <div
      class="
        w-full
        rounded-lg
        aspect-square
        md:max-w-[560px]
        md:rounded-2xl
        overflow-hidden border-[3px] border-gray-800 shrink-2 flex justify-center items-center"
    >
      <NftImage
        :image="nft.image"
        classRoot="aspect-square min-w-full !max-w-[560px] bg-gray-200 pulse w-full"
      />
    </div>

    <div
      class="p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6 w-full shrink-2"
    >
      <div
        class="grid gap-3"
      >
        <div
          class="grid gap-2"
        >
          <span
            class="text-font-500 font-medium block"
          >
            {{  nft.collection }}
          </span>

          <span
            class="text-[20px] md:text-[30px] lg:text-[40px] font-semibold block text-font-400 max-w-[500px]"
          >
            {{ nft.name }}
          </span>
        </div>
      </div>

      <!-- <div
        class="w-full hidden bazk:flex gap-6"
      >
        <NftVolume
          label="Price"
          amount="23 KDA"
          conversion="$42,22"
        />

        <NftVolume
          label="Floor Price"
          amount="23 KDA"
          conversion="$42,22"
        />
      </div> -->

      <div
        class="grid gap-3 md:gap-4 lg:gap-6"
      >
        <LabelValue
          copy
          label="NFT Id"
          :value="props.contract.id"
          :description="blockchainTooltipData.nftDetails.id"
        />

        <LabelValue
          copy
          label="Chain Id"
          :value="props.contract.chainId"
          :description="blockchainTooltipData.nftDetails.owner"
        />

        <LabelValue
          copy
          label="Module"
          :value="props.contract.module"
          :description="blockchainTooltipData.nftDetails.owner"
        />

        <LabelValue
          label="Collection"
          :value="nft.collection"
          :description="blockchainTooltipData.nftDetails.creator"
        />

        <LabelValue
          label="Timestamp"
          :description="blockchainTooltipData.nftDetails.timestamp"
          :value="(new Date(Number(nft.createdAt)) as any).toGMTString()"
        />

        <!-- <LabelValue
          label="Marketplace"
        >
          <template #value>
            <div
              class="flex gap-4 items-center"
            >
              <img
                class="h-5 w-5"
                src="/marketplace/1.svg"
              />

              <img
                class="h-5 w-5"
                src="/marketplace/2.svg"
              />
            </div>
          </template>
        </LabelValue> -->
      </div>
    </div>
  </div>
</template>
