<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

const props = defineProps<{
  modulename: string;
  market_data?: any;
}>()

const {
  blockchainTooltipData,
  holdersTableColumns
} = useAppConfig()

const query = gql`
  query GetHoldersByToken($first: Int, $last: Int, $after: String, $before: String, $moduleName: String!) {
    getHolders(first: $first, last: $last, after: $after, before: $before, moduleName: $moduleName) {
      totalCount
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          address
          percentage
          quantity
        }
      }
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

const { data: holders, pending, error } = await useAsyncData('holders-off-token', async () => {
  const {
    getHolders
  } = await $graphql.default.request(query, {
    ...params.value,
    moduleName: props.modulename,
  });

  const totalPages = Math.max(Math.ceil(getHolders.totalCount / limit.value), 1)

  console.log('getHolders', getHolders);

  return {
    pageInfo: getHolders.pageInfo,
    totalCount: getHolders.totalCount,
    nodes: (getHolders?.edges ?? []).map(({ node }) => node),
    totalPages
  };
}, {
  watch: [page],
  lazy: true,
});

watch([holders], ([newPage]) => {
  if (!newPage) {
    return
  }

  updateCursor(newPage.pageInfo.startCursor)
})

console.log('holders', holders.value);
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
        :rows="holders?.nodes ?? []"
        :columns="holdersTableColumns"
      >
        <template #percentage="{ row }">
          <ColumnPercentage
            :value="Number(row.percentage) / 100"
          />
        </template>

        <template #address="{ row }">
          <ColumnAddress
            :chars="14"
            :value="row.address"
          />
        </template>

        <template #ranking="{ order }">
          {{ order + 1 }}
        </template>

        <template #quantity="{ row }">
          {{ customInteger(Number(row.quantity)) }}

        </template>

        <template #value="{ row }">
          {{ customMoney(Number(row.quantity) * (market_data?.current_price.usd || 0)) }}
        </template>

        <template
          #empty
        >
          <EmptyTable
            image="/empty/txs.png"
            title="No holders found yet"
            description="We couldn't find any holder"
          />
        </template>

        <template
          #footer
        >
          <PaginateTable
            :currentPage="page"
            :totalItems="holders?.totalCount ?? 1"
            :totalPages="holders?.totalPages"
            @pageChange="updatePage(Number($event), holders.pageInfo, holders.totalCount ?? 1, holders.totalPages)"
            class="p-3"
          />
        </template>
      </TableRoot>
    </div>
  </PageRoot>
</template>
