<script setup lang="ts">
defineProps<{
  id?: string;
  name?: string;
  symbol?: string;
  description?: any;
  market_data?: any;
}>()

const {
  blockchainTooltipData
} = useAppConfig()
</script>

<template>
  <PageRoot>
    <div
      class="flex flex-col gap-4"
    >
      <span
        class="bazk:text-xl bazk:font-semibold text-font-400"
      >
        Overview
      </span>

      <span
        v-if="description"
        v-text="description.en"
        class="text-xs bazk:text-sm text-font-400"
      />

      <span
        v-else
        class="text-xs bazk:text-sm text-font-400"
      >
        Information unavailable
      </span>
    </div>

    <div
      class="flex flex-col gap-3 bazk:gap-4"
    >
      <span
        class="bazk:text-xl bazk:font-semibold text-font-400"
      >
        Market
      </span>

      <div
        class="flex flex-col gap-4"
      >
        <LabelValue
          label="Market Capitalization"
          :value="market_data ? customMoney(market_data.market_cap.usd) : 'Information unavailable'"
          :description="blockchainTooltipData.tokenDetails.information.marketCapitalization"
        />

        <LabelValue
          label="Volume (24H)"
          :value="market_data ? moneyCompact.format(market_data.total_volume.usd) : 'Information unavailable'"
          :description="blockchainTooltipData.tokenDetails.information.volume24H"
        />

        <LabelValue
          label="Circulating supply"
          :description="blockchainTooltipData.tokenDetails.information.circulatingSupply"
        >
          <template #value>
            <span v-if="market_data" class="uppercase">
              {{ `${integer.format(market_data.circulating_supply)} ${symbol}` }}
            </span>

            <span
              v-else
              class="text-xs bazk:text-sm text-font-400"
            >
              Information unavailable
            </span>
          </template>
        </LabelValue>

        <LabelValue
          label="Market Data Source"
          class="w-auto"
        >
          <template #value>
            <NuxtLink
              v-if="id"
              target="_blank"
              :to="`https://www.coingecko.com/en/coins/${id}`"
            >
              <div
                class="flex items-center px-2 py-1 gap-1 rounded bg-gray-600 shrink-0 max-w-max"
              >
                <IconCoinGecko
                  class="w-4 h-4 shrink-0"
                />

                <span
                  class="text-xs font-medium leading-[150%] shrink-0"
                >
                  CoinGecko
                </span>
              </div>
            </NuxtLink>

            <span
              v-else
              class="text-xs bazk:text-sm text-font-400"
            >
              Information unavailable
            </span>

          </template>
        </LabelValue>
      </div>
    </div>
  </PageRoot>
</template>
