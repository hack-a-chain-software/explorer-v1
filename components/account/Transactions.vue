<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

const props = defineProps<{
  address: string;
}>()

const {
  accountTransactionsTableColumns
} = useAppConfig()

const query = gql`
  query GetTransactions($first: Int, $last: Int, $after: Cursor, $before: Cursor, $sender: String) {
    allTransactions(first: $first, last: $last, after: $after, before: $before, orderBy: ID_DESC, filter: {sender: { equalTo: $sender }}) {
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

const { data: transactions, pending, error } = await useAsyncData('account-all-transactions', async () => {
  const {
    allTransactions
  } = await $graphql.default.request(query, {
    ...params.value,
    sender: props.address,
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
    <div
      class="py-3 md:p-6 rounded-lg md:rounded-2xl border border-gray-300"
    >
      <TableRoot
        :pending="pending"
        :rows="transactions?.nodes || []"
        :columns="accountTransactionsTableColumns"
      >
        <template #status="{ row }">
          <ColumnStatus
            :key="'status-' + row.requestkey"
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

        <template #block="{ row }">
          <ColumnLink
            :to="`/blocks/${row.blockId ?? 'null'}`"
            :label="row.blockId ?? 'null'"
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
            title="No transactions found for this account"
            description="We couldn't find any transactions for this account"
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
