<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

const props = defineProps<{
  address: string;
}>()

const {
  blockchainTooltipData,
  blockTransactionsTableColumns
} = useAppConfig()

const query = gql`
  query GetNftBalances($first: Int, $last: Int, $after: Cursor, $before: Cursor, $account: String!) {
    allBalances(first: $first, last: $last, after: $after, before: $before, orderBy: ID_DESC, condition: {account: $account, hasTokenId: true}) {
      nodes {
        updatedAt
        tokenId
        qualname
        nodeId
        network
        module
        id
        hasTokenId
        createdAt
        contractId
        chainId
        balance
        account
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
  updatePage,
  updateCursor,
} = usePagination(10);

const { $graphql } = useNuxtApp();

const { data: nfts, pending } = await useAsyncData('account-nft-balances', async () => {
  const {
    allBalances,
  } = await $graphql.default.request(query, {
    ...params.value,
    account: props.address,
  });

  const totalPages = Math.max(Math.ceil(allBalances.totalCount / limit.value), 1)

  return {
    ...allBalances,
    totalPages
  };
}, {
  watch: [page],
  lazy: true,
});

watch([nfts], ([newPage]) => {
  if (!newPage) {
    return;
  }

  updateCursor(newPage.pageInfo.startCursor)
})
</script>

<template>
  <div>
    <TableNft
      :pending="pending"
      :items="nfts?.nodes ?? []"
    >
      <template
        #empty
      >
        <EmptyTable
          image="/empty/txs.png"
          title="No NFTs found yet"
          description="We couldn't find any nft"
        />
      </template>

      <template
        #footer
      >
        <PaginateTable
          itemsLabel="NFT's"
          :currentPage="page"
          :totalItems="nfts?.totalCount ?? 1"
          :totalPages="nfts?.totalPages"
          @pageChange="updatePage(Number($event), nfts.pageInfo, nfts.totalCount ?? 1, nfts.totalPages)"
        />
      </template>
    </TableNft>
  </div>
</template>
