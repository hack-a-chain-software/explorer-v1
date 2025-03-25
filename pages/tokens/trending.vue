<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

definePageMeta({
  layout: 'app',
})

useHead({
  title: 'Trending Tokens (KTS)'
})

const {
  trendingTokensTableColumns
} = useAppConfig()

const { $coingecko } = useNuxtApp();

const { data: tokens, pending, error } = await useAsyncData('tokens-trending', async () =>
  await $coingecko.request('coins/markets', {
    vs_currency: 'usd',
    category: 'kadena-ecosystem',
  })
);
</script>

<template>
  <PageRoot
    :error="error"
  >
    <PageTitle>
      Trending Tokens
    </PageTitle>

    <PageContainer>
      <TableRoot
        :rows="tokens ?? []"
        :pending="pending"
        title="Trending Tokens"
        :columns="trendingTokensTableColumns"
      >
        <template #ranking="{ order }">
          {{ order + 1 }}
        </template>

        <template #token="{ row }">
          <ColumnToken
            v-bind="row"
            :icon="row.image"
          />
        </template>

        <template #price="{ row }">
          <span
            class="text-sm text-font-400"
          >
            {{ customMoney(row?.current_price) }}
          </span>
        </template>

        <template #change="{ row }">
          <ColumnDelta
            :delta="row.price_change_percentage_24h"
          />
        </template>

        <template #marketCap="{ row }">
          <span
            class="text-sm text-font-400"
          >
            {{ money.format(row.market_cap) }}
          </span>
        </template>

        <template #supply="{ row }">
          <span
            class="text-sm text-font-400"
          >
            {{ money.format(row.circulating_supply) }}
          </span>
        </template>

        <template #volume="{ row }">
          <ColumnVolume
            :amount="money.format(row.total_volume)"
            :dollar="`${integer.format(row.total_volume / row.current_price)} ${row.symbol}`"
          />
        </template>

        <template
          #empty
        >
          <EmptyTable
            image="/empty/txs.png"
            title="No trending tokens found yet"
            description="We couldn't find any trending tokens"
          />
        </template>
      </TableRoot>
    </PageContainer>
  </PageRoot>
</template>
