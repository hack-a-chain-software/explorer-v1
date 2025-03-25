<script setup lang="ts">
defineProps<{
  id?: string;
  links?: any;
  image?: any;
  name?: string;
  symbol?: string;
  market_data?: any;
  modulename?: any;
  detail_platforms?: any;
}>()

const {
  blockchainTooltipData
} = useAppConfig()
</script>

<template>
  <PageRoot>
    <div
      class="flex items-center gap-2"
    >
      <div
        v-if="!image"
        class="w-[34px] h-[34px] bg-gray-300 pulse rounded"
      />

      <img
        v-else
        :src="image?.large"
        class="w-[34px] h-[34px]"
      />

      <span
        class="text-2xl font-semibold leading-[130%] text-font-400"
      >
        {{ name || 'Unknown name' }}
      </span>

      <span
        class="uppercase text-[20px] font-medium text-font-500"
      >
        {{ symbol }}
      </span>

      <IconVerified
        v-if="id"
      />
    </div>

    <div
      class="grid grid-cols-1 md:gap-4 md:grid-cols-2 divide-y divide-gray-300 md:divide-y-0"
    >
      <div
        class="flex flex-col gap-4 pb-4 md:pb-0"
      >
        <div>
          <span
            class="text-font-400"
          >
            Overview
          </span>
        </div>

        <div
          class="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4"
        >
          <LabelValue
            label="Price"
            :description="blockchainTooltipData.tokenDetails.overview.price"
          >
            <template
              #value
            >
              <div
                v-if="market_data"
                class="flex text-base gap-2"
              >
                1 <span class="uppercase">{{ symbol }}</span> <span class="text-font-500">{{ customMoney(market_data?.current_price.usd) }}</span>
              </div>

              <div
                v-else
              >
                Information unavailable
              </div>
            </template>
          </LabelValue>

          <LabelValue
            label="Max Total Supply"
            :value="market_data ? integer.format(market_data?.max_supply || 0) : 'Information unavailable'"
            :description="blockchainTooltipData.tokenDetails.overview.maxTotalSupply"
          />

          <!-- <LabelValue
            value="-"
            label="Holders"
            :description="blockchainTooltipData.tokenDetails.overview.holders"
          /> -->

          <!-- <LabelValue
            value="-"
            label="Total Transfers"
            :description="blockchainTooltipData.tokenDetails.overview.totalTransfers"
          /> -->
        </div>
      </div>

      <div
        class="flex flex-col gap-4 pt-4 md:pt-0"
      >
        <div>
          <span
            class="text-font-400"
          >
            Profile Summary
          </span>
        </div>

        <div
          class="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4"
        >
          <LabelValue
            label="Module"
            :value="detail_platforms ? detail_platforms.kadena?.contract_address || 'coin' : modulename ?? 'Information unavailable'"
            :description="blockchainTooltipData.tokenDetails.summary.contract"
          />

          <LabelValue
            label="Decimals"
            :value="detail_platforms ? detail_platforms.kadena?.decimal_place || '12' : 'Information unavailable'"
            :description="blockchainTooltipData.tokenDetails.summary.decimals"
          />

          <LabelValue
            label="Website"
            :description="blockchainTooltipData.tokenDetails.summary.website"
          >
            <template
              #value
            >
              <NuxtLink
                target="__blank"
                :to="links?.homepage[0] || ''"
              >
                {{ links ? links.homepage[0].replace(/^https?:\/\/(www\.)?/, '') : 'Information unavailable' }}
              </NuxtLink>
            </template>
          </LabelValue>

          <LabelValue
            label="Community"
          >
            <template #value>
              <div
                v-if="links"
                class="flex items-center gap-4"
              >
                <Network
                  icon="github"
                  target="__blank"
                  :to="links.repos_url?.github[0]"
                  v-if="links.repos_url?.github[0]"
                />

                <Network
                  icon="telegram"
                  target="__blank"
                  :to="`https://t.me/${links.telegram_channel_identifier}`"
                  v-if="links.telegram_channel_identifier"
                />

                <Network
                  icon="twitter"
                  target="__blank"
                  :to="`https://x.com/${links.twitter_screen_name}`"
                  v-if="links.twitter_screen_name"
                />
              </div>

              <div
                v-else
              >
                Information unavailable
              </div>
            </template>
          </LabelValue>
        </div>
      </div>
    </div>
  </PageRoot>
</template>
