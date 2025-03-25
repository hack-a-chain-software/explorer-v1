<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

const props = defineProps<{
  hash: string;
  id: number,
  chainId: number,
}>()

const {
  blockchainTooltipData,
  blockTransactionsTableColumns
} = useAppConfig()

const query = gql`
  query GetTransactions($first: Int, $last: Int, $after: Cursor, $before: Cursor, $blockId: Int, $chainId: Int) {
    allTransactions(first: $first, last: $last, after: $after, before: $before, orderBy: ID_DESC, condition: {blockId: $blockId, chainId: $chainId}) {
      nodes {
        code
        result
        nodeId
        requestkey
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`

const {
  page,
  limit,
  params,
  updatePage,
  updateCursor,
} = usePagination();

const { $graphql } = useNuxtApp();

const { data: transactions, pending, error } = await useAsyncData('block-all-transactions', async () => {
  const {
    allTransactions
  } = await $graphql.default.request(query, {
    ...params.value,
    blockId: Number(props.id),
    chainId: Number(props.chainId)
  });

  const totalPages = Math.max(Math.ceil(allTransactions.totalCount / limit.value), 1)

  return {
    ...allTransactions,
    totalPages
  };
}, {
  watch: [page],
  lazy: true,
});

watch([transactions], ([newPage]) => {
  if (!newPage) {
    return
  }

  updateCursor(newPage.pageInfo.startCursor)
})
</script>

<template>
  <PageRoot
    :error="error"
  >
    <LabelValue
      withCopy
      label="Block Hash"
      :value="hash"
      :description="blockchainTooltipData.block.transactions.blockHash"
    />

    <div
      class="py-3 md:p-6 rounded-lg md:rounded-2xl border border-gray-300"
    >
      <TableRoot
        :pending="pending"
        :rows="transactions?.nodes ?? []"
        :columns="blockTransactionsTableColumns"
      >
        <template #status="{ row }">
          <ColumnStatus
            :key="'status-' + row.requestKey"
            :row="row"
          />
        </template>

        <template #requestkey="{ row }">
          <ColumnLink
            withCopy
            :label="row.requestkey"
            :to="`/transactions/${row.requestkey}`"
          />
        </template>

        <template #code="{ row }">
          <ColumnLink
            withCopy
            :label="row.code"
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

        <template #receiver="{ row }">
          <ColumnAddress
            :value="row.receiver"
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
            :totalItems="transactions?.totalCount ?? 1"
            :totalPages="transactions?.totalPages"
            @pageChange="updatePage(Number($event), transactions.pageInfo, transactions.totalCount ?? 1, transactions.totalPages)"
            class="p-3"
          />
        </template>
      </TableRoot>
    </div>
  </PageRoot>
</template>
