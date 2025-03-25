<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

const props = defineProps<{
  modulename?: string,
  symbol?: string,
}>()

const {
  tokenDetailTransferTableColumns
} = useAppConfig()

const query = gql`
  query GetTransactions($first: Int, $last: Int, $after: Cursor, $before: Cursor, $modulename: String!) {
    allTransfers(first: $first, last: $last, after: $after, before: $before, orderBy: ID_DESC, condition: {modulename: $modulename}) {
      nodes {
        requestkey
        amount
        createdAt
        fromAcct
        toAcct
        chainId
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

const { data: transfers, pending, error } = await useAsyncData('token-transfers', async () => {
  const {
    allTransfers,
  } = await $graphql.default.request(query, {
    ...params.value,
    modulename: props.modulename ?? 'coin'
  });

  const totalPages = Math.max(Math.ceil(allTransfers.totalCount / limit.value), 1)

  return {
    ...allTransfers,
    totalPages
  };
}, {
  watch: [page],
  lazy: true,
});

watch([transfers], ([newPage]) => {
  if (!newPage) {
    return
  }

  updateCursor(newPage?.pageInfo.startCursor)
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
        id="token-transfers-table"
        :rows="transfers?.nodes ?? []"
        :columns="tokenDetailTransferTableColumns"
      >
        <template #method>
          <Chip />
        </template>

        <template #requestKey="{ row }">
          <ColumnLink
            withCopy
            :label="row.requestkey"
            :to="`/transactions/${row.requestkey}`"
          />
        </template>

        <template #from="{ row }">
          <ColumnAddress
            :value="row.fromAcct"
          />
        </template>

        <template #amount="{ row }">
          <div
            class="text-font-450 text-sm"
          >
            {{ row.amount }}
            <span
              class="uppercase"
            >
              {{ symbol }}
            </span>
          </div>
        </template>

        <template #to="{ row }">
          <ColumnAddress
            :value="row.toAcct"
          />
        </template>

        <template #date="{ row }">
          <ColumnDate
            :row="row"
          />
        </template>

        <template
          #empty
        >
          <EmptyTable
            image="/empty/txs.png"
            title="No transfers found yet"
            description="We couldn't find transfer"
          />
        </template>

        <template
          #footer
        >
          <PaginateTable
            :currentPage="page"
            :totalItems="transfers?.totalCount ?? 1"
            :totalPages="transfers?.totalPages"
            @pageChange="updatePage(Number($event), transfers.pageInfo, transfers.totalCount ?? 1, transfers.totalPages)"
            class="p-3"
          />
        </template>
      </TableRoot>
    </div>
  </PageRoot>
</template>
