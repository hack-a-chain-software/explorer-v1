<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

definePageMeta({
  layout: 'app',
})

useHead({
  title: 'Kadscan'
})

const defaultChartData = {
  market_caps: [],
  prices: [],
  total_volumes: []
}

const { $graphql, $coingecko } = useNuxtApp();

const query = gql`
  query GetLastBlockAndTransaction {
    allTransactions(last: 5) {
      nodes {
        chainId
        createdAt
        id
        metadata
        nodeId
        numEvents
        requestkey
        gasprice
        result
        sender
        gas
      }
    }
    allBlocks(last: 5) {
      nodes {
        chainId
        parent
        createdAt
        hash
        height
        id
        nodeId
        coinbase
        minerData
        transactionsCount
      }
    }
  }
`

const { data: cgData, status: cgStatus, error: cgError } = await useAsyncData('home-cg-etl', async () => {
  const [
    token,
    chartData,
  ] = await Promise.all([
    $coingecko.request('coins/kadena'),
    $coingecko.request('coins/kadena/market_chart', {
      days: 14,
      interval: 'daily',
      vs_currency: 'usd',
    })
  ]);

  return {
    token,
    chartData,
  };
}, {
  // remove
  lazy: true,
});

const { data, error, status } = await useAsyncData('home-transactions-blocks', async () => {
  const [
    apiRes,
  ] = await Promise.all([
    $graphql.default.request(query),
  ]);

  return {
    ...apiRes
  };
}, {
  // remove
  lazy: true,
});
</script>

<template>
  <div
    class="flex flex-col gap-4 lg:gap-10 lg:pt-4"
  >
    <HomeHero />

    <Container
      class="lg:!p-8 gap-4 lg:gap-6 grid lg:grid-cols-2"
    >
      <div
        class="
          p-3 lg:p-4 gap-2 lg:gap-4 flex-grow grid lg:grid-cols-2 bg-gray-700 rounded-lg lg:rounded-xl
        "
      >
        <HomeCard
          :isLoading="cgStatus === 'pending'"
          :label="'Kadena Price'"
          :description="moneyCompact.format(cgData?.token?.market_data?.current_price?.usd || 0)"
          :delta="cgData?.token?.market_data?.price_change_percentage_24h_in_currency?.usd || 0"
        />

        <HomeCard
          isDark
          label="Total volume 24h"
          :isLoading="cgStatus === 'pending'"
          :delta="cgData?.token?.market_data?.price_change_percentage_24h"
          :description="moneyCompact.format(cgData?.token?.market_data?.total_volume?.usd || 0)"
        />

        <HomeCard
          label="Market Capital"
          :isLoading="cgStatus === 'pending'"
          :description="moneyCompact.format(cgData?.token?.market_data?.market_cap?.usd || 0)"
        />

        <HomeCard
          label="Circulating Supply"
          :isLoading="cgStatus === 'pending'"
          :description="moneyCompact.format(cgData?.token?.market_data?.circulating_supply || 0)"
        />
      </div>

      <div
        v-if="cgStatus !== 'pending'"
        class="w-full h-full flex flex-col gap-3 lg:gap-6"
      >
        <span
          class="text-font-400"
        >
          KDA Price 14 days
        </span>

        <div
          class="h-full max-h-[216px]"
        >
          <Chart
            :key="cgStatus"
            v-bind="cgData?.chartData || defaultChartData"
          />
        </div>
      </div>
    </Container>

    <div
      v-if="status === 'pending'"
      class="grid lg:grid-cols-2 gap-4 lg:gap-6"
    >
      <SkeletonHomeTransactionList />

      <SkeletonHomeBlockList />
    </div>

    <div
      v-if="status !== 'error' && data"
      class="grid lg:grid-cols-2 gap-4 lg:gap-6"
    >
      <HomeList
        label="Recent Transactions"
        path="/transactions"
      >
        <HomeTransaction
          v-bind="transaction"
          :key="transaction.requestKey"
          v-for="transaction in data?.allTransactions?.nodes ?? []"
        />
      </HomeList>

      <HomeList
        label="Recent Blocks"
        path="/blocks"
      >
        <HomeBlock
          v-bind="block"
          :key="block.hash"
          v-for="block in data?.allBlocks?.nodes ?? []"
        />
      </HomeList>
    </div>

    <Error
      v-else-if="status === 'error'"
      :error="error"
    />
  </div>
</template>
