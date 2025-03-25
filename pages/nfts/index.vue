<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

definePageMeta({
  layout: 'app',
})

useHead({
  title: 'NFT Transfers'
})

const {
  nftTransfersTableColumns
} = useAppConfig()

const query = gql`
  query GetNftTransfers($first: Int, $last: Int, $after: Cursor, $before: Cursor) {
    allTransfers(condition: {type: "poly-fungible"}, first: $first, last: $last, after: $after, before: $before, orderBy: ID_DESC) {
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
        id
        chainId
        createdAt
        fromAcct
        amount
        contractByContractId {
          id
          metadata
          module
          tokenId
        }
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

const {
  page,
  limit,
  params,
  updatePage,
  updateCursor,
} = usePagination(20);

const { $graphql } = useNuxtApp();

const { data: transfers, pending, error } = await useAsyncData('nfts-transfers', async () => {
  const { allTransfers } = await $graphql.default.request(query, {
    ...params.value,
  });

  const totalPages = Math.max(Math.ceil(allTransfers.totalCount / limit.value), 1)

  return {
    ...allTransfers,
    totalPages
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

  updateCursor(newPage.pageInfo.startCursor)
})
</script>

<template>
  <PageRoot
    :error="error"
  >
    <PageTitle>
      NFT Transfers
    </PageTitle>

    <TableContainer>
      <TableRoot
        title="Latest Transactions"
        :pending="pending"
        :rows="transfers?.nodes || []"
        :columns="nftTransfersTableColumns"
      >
        <template #method>
          <Chip />
        </template>

        <template #hash="{ row }">
          <ColumnLink
            withCopy
            withouMax
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

        <template #date="{ row }">
          <ColumnDate
            :row="row"
          />
        </template>

        <template #item="{ row }">
          <ColumnNft
            :contract="row.contractByContractId"
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
            title="No latest transfers found yet"
            description="We couldn't find any latest transfers"
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
            @pageChange="updatePage(Number($event), transfers.pageInfo, transfers.totalCount ?? 1, transfers.totalPages)"
          />
        </template>
      </TableRoot>
    </TableContainer>
  </PageRoot>
</template>
