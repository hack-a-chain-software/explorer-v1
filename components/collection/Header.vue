<script setup lang="ts">
const {
  networks,
  blockchainTooltipData
} = useAppConfig()
</script>

<template>
  <div
    class="w-full flex flex-col rounded-lg bazk:rounded-2xl bg-gray-800 overflow-hidden"
  >
    <div
      class="w-full h-[280px] overflow-hidden flex items-center justify-center"
    >
      <img
        src="/collection/banner.webp"
        class="w-max max-w-[1320px]"
      />
    </div>

    <div
      class="p-4 pt-2 bazk:p-6 flex flex-col gap-4 bazk:gap-8"
    >
      <div
        class="flex justify-between items-start gap-4"
      >
        <div
          class="flex flex-col gap-4 max-w-[464px]"
        >
          <div
            class="
              flex justify-end bazk:justify-start flex-col bazk:flex-row gap-4 bazk:items-end max-h-[58px] bazk:max-h-[78px]
            "
          >
            <div
              class="rounded-2xl overflow-hidden border bazk:border-[3px] border-gray-800 shrink-0 w-max"
            >
              <img
                src="/collection/profile.webp"
                class="w-20 h-20 bazk:w-[180px] bazk:h-[180px]"
              />
            </div>

            <div
              class="flex flex-col gap-2 bazk:gap-3"
            >
              <div
                class="flex items-center gap-2"
              >
                <span
                  class="text-xl bazk:text-2xl font-medium bazk:font-semibold block text-font-400 leading-[28px] block"
                >
                  Mock
                </span>

                <IconVerified
                  class="h-6 w-6"
                />
              </div>

              <div
                class="w-max gap-2 rounded bg-gray-700 bazk:bg-transparent bazk:border bazk:border-gray-300 px-2 bazk:px-3 py-1 bazk:py-1.5 flex items-center"
              >
                <span
                  class="text-xs text-font-400 font-medium block leading-[18px]"
                >
                  k:00000000000000...
                </span>

                <IconCopy
                  class="w-4 h-4"
                />
              </div>
            </div>
          </div>

          <div>
            <span
              class="text-xs text-font-400 block"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </span>
          </div>
        </div>

        <div
          class="hidden bazk:flex h-auto gap-4"
        >
          <Network
            v-for="network in networks"
            :key="network.to"
            :to="network.to"
            target="__blank"
            :icon="network.icon"
          />
        </div>
      </div>

      <div
        class="grid gap-3 bazk:gap-0 grid-cols-2 bazk:grid-cols-6"
      >
        <LabelValue
          col
          value="0"
          label="Total items"
          :description="blockchainTooltipData.nft.collection.totalItems"
        />

        <LabelValue
          col
          value="0"
          label="Owners"
          :description="blockchainTooltipData.nft.collection.owners"
        />

        <LabelValue
          col
          label="For Sale"
          value="0"
          :description="blockchainTooltipData.nft.collection.forSale"
        />

        <LabelValue
          col
          label="Floor Price"
          value="0.0 KDA"
          :description="blockchainTooltipData.nft.collection.floorPrice"
        />

        <LabelValue
          col
          label="Average Price"
          value="0.0 KDA"
          :description="blockchainTooltipData.nft.collection.averagePrice"
        />

        <LabelValue
          col
          label="Volume"
          value="0.0 KDA"
          :description="blockchainTooltipData.nft.collection.volume"
        />
      </div>
    </div>
  </div>
</template>
