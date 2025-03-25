<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

definePageMeta({
  layout: 'app',
})

useHead({
  title: 'Token Transfers'
})

const {
  tokenTransfersTableColumns
} = useAppConfig()

const query = gql`
  query GetTokenTransfers($first: Int, $last: Int, $after: Cursor, $before: Cursor) {
    allTransfers(condition: {type: "fungible"}, first: $first, last: $last, after: $after, before: $before, orderBy: ID_DESC) {
      nodes {
        tokenId
        updatedAt
        transactionId
        toAcct
        requestkey
        payloadHash
        nodeId
        modulehash
        modulename
        chainId
        createdAt
        fromAcct
        amount
      }
      pageInfo {
        startCursor
        hasPreviousPage
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`

const key = 'allTransfers'

const { $graphql } = useNuxtApp();

const {
  page,
  limit,
  params,
  updatePage,
  updateCursor,
} = usePagination();

const { data: transfers, pending, error } = await useAsyncData('all-token-transfers', async () => {
  const { allTransfers } = await $graphql.default.request(query, {
    ...params.value,
  });

  const totalPages = Math.max(Math.ceil(allTransfers.totalCount / limit.value), 1)

  return {
    totalPages,
    totalCount: allTransfers.totalCount,
    pageInfo: allTransfers.pageInfo,
    nodes: allTransfers.nodes.map((transfer: any) => {
      const metadata = staticTokens.find(({ module }) => module === transfer.modulename) || unknownToken

      return {
        ...transfer,
        metadata,
      }
    }),
  };
}, {
  watch: [page],
  // remove
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
    <PageTitle>
      Token Transfers
    </PageTitle>

    <TableContainer>
      <TableRoot
        :pending="pending"
        title="Latest Transactions"
        :rows="transfers?.nodes || []"
        :columns="tokenTransfersTableColumns"
      >
        <template #method>
          <Chip />
        </template>

        <template #requestkey="{ row }">
          <ColumnLink
            withCopy
            withouMax
            :value="row.requestkey"
            :label="row.requestkey"
            :to="`/transactions/${row.requestkey}`"
          />
        </template>

        <template #from="{ row }">
          <ColumnAddress
            :value="row.fromAcct"
          />
        </template>

        <template #to="{ row }">
          <ColumnAddress
            :value="row.toAcct"
          />
        </template>

        <template #token="{ row }">
          <ColumnToken
            v-bind="row.metadata"
          />
        </template>

        <template #date="{ row }">
          <ColumnDate
            :row="row"
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
            title="No latest token transactions found yet"
            description="We couldn't find any trending tokens"
          />
        </template>

        <template
          #footer
        >
          <PaginateTable
            itemsLabel="Transfers"
            :currentPage="page"
            :totalItems="transfers?.totalCount ?? 1"
            :totalPages="transfers?.totalPages"
            @pageChange="updatePage(Number($event), transfers?.pageInfo, transfers?.totalCount ?? 1, transfers?.totalPages)"
          />
        </template>
      </TableRoot>
    </TableContainer>
  </PageRoot>
</template>
