<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

definePageMeta({
  layout: 'app',
})

useHead({
  title: 'Transactions'
})

const {
  transactionTableColumns
} = useAppConfig()

const query = gql`
  query GetTransactions($first: Int, $last: Int, $after: Cursor, $before: Cursor, $chainId: Int) {
    allTransactions(first: $first, last: $last, after: $after, before: $before, orderBy: ID_DESC, filter: {chainId: {equalTo: $chainId}}) {
      nodes {
        chainId
        code
        createdAt
        continuation
        creationtime
        data
        gas
        gaslimit
        gasprice
        id
        metadata
        blockId
        logs
        nonce
        nodeId
        numEvents
        pactid
        payloadHash
        proof
        requestkey
        result
        sender
        rollback
        step
        ttl
        txid
        updatedAt
        blockByBlockId {
          height
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      totalCount
    }
  }
`

const {
  page,
  limit,
  params,
  cursor,
  updatePage,
  updateCursor,
} = usePagination();

const chain = ref<any>(null);
const totalTransactions = ref(null)

const updateChain = (newChain: any) => {
  chain.value = newChain;
  cursor.value = undefined;
  page.value = 1;
}

const { $graphql, $coingecko } = useNuxtApp();

const { data: blockchain, status: cgStatus, error: blockchainError } = await useAsyncData('transactions-chart', async () => {
  const res = await $coingecko.request('coins/kadena');
  return res;
}, {
  // remove
  lazy: true,
});

const { data: transactions, status, pending, error } = await useAsyncData('transactions-recent', async () => {
  const {
    allTransactions,
  } = await $graphql.default.request(query, {
    ...params.value,
    chainId: chain.value,
  });

  const totalPages = Math.max(Math.ceil(allTransactions.totalCount / limit.value), 1);

  if (!totalTransactions.value) {
    totalTransactions.value = allTransactions.totalCount;
  }

  return {
    ...allTransactions,
    totalPages
  };
}, {
  watch: [params, chain],
  // remove
  lazy: true,
});

watch([transactions], ([newPage]) => {
  if (!newPage) {
    return;
  }

  updateCursor(newPage?.pageInfo?.startCursor)
})
</script>

<template>
  <PageRoot
    :error="error"
  >
    <PageTitle>
      Transactions
    </PageTitle>

    <div
      class="grid gap-3 bazk:grid-cols-4 bazk:gap-6"
    >
      <Card
        label="Market Cap (24h)"
        :isLoading="cgStatus === 'pending'"
        :description="moneyCompact.format(blockchain?.market_data?.market_cap?.usd || 0)"
        :delta="blockchain?.market_data?.market_cap_change_percentage_24h"
      />

      <Card
        label="Total Volume (24h)"
        :isLoading="cgStatus === 'pending'"
        :description="moneyCompact.format(blockchain?.market_data?.total_volume?.usd || 0)"
        :delta="blockchain?.market_data?.price_change_percentage_24h || 0"
      />

      <Card
        label="Circulating Supply (24h)"
        :isLoading="cgStatus === 'pending'"
        :description="moneyCompact.format(blockchain?.market_data?.circulating_supply || 0)"
      />

      <Card
        :description="totalTransactions || ''"
        label="Total transactions (All time)"
        :isLoading="pending && !totalTransactions"
      />
    </div>

    <TableContainer>
      <TableRoot
        :chain="chain"
        @chain="updateChain"
        title="Recent Transactions"
        :pending="pending"
        :rows="transactions?.nodes || []"
        :columns="transactionTableColumns"
      >
        <template #status="{ row }">
          <ColumnStatus
            :row="row"
          />
        </template>

        <template #requestKey="{ row }">
          <ColumnLink
            withCopy
            :label="row.requestkey"
            :to="`/transactions/${row.requestkey}`"
          />
        </template>

        <template #createdAt="{ row }">
          <ColumnDate
            :row="row"
          />
        </template>

        <template #sender="{ row }">
          <ColumnAddress
            :value="row.sender"
          />
        </template>

        <template #block="{ row }">
          <ColumnLink
            :to="row.blockByBlockId ?`/blocks/chain/${row.chainId}/height/${row?.blockByBlockId?.height}`: ''"
            :label="row?.blockByBlockId?.height ?? 'null'"
          />
        </template>

        <template #icon="{ row }">
          <EyeLink
            :to="`/transactions/${row.requestkey}`"
          />
        </template>

        <template
          #empty
        >
          <EmptyTable
            image="/empty/txs.png"
            title="No transactions found yet"
            description="We couldn't find any recent transactions"
          />
        </template>

        <template
          #footer
        >
          <PaginateTable
            :currentPage="page"
            :totalItems="transactions.totalCount ?? 1"
            :totalPages="transactions.totalPages"
            @pageChange="updatePage(Number($event), transactions.pageInfo, transactions.totalCount ?? 1, transactions.totalPages)"
          />
        </template>
      </TableRoot>
    </TableContainer>
  </PageRoot>
</template>
