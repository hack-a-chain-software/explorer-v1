<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

definePageMeta({
  layout: 'app',
})

useHead({
  title: 'Blocks'
})

const {
  blocksTableColumns
} = useAppConfig()

const query = gql`
  query GetBlocks($first: Int, $last: Int, $after: Cursor, $before: Cursor) {
    allBlocks(first: $first, last: $last, after: $after, before: $before, orderBy: ID_DESC) {
      nodes {
        chainId
        coinbase
        createdAt
        hash
        height
        id
        nodeId
        minerData
        transactionsCount
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
} = usePagination(20);

const { $graphql } = useNuxtApp();

const { data: blocks, pending, error } = await useAsyncData('blocks-recent', async () => {
  const { allBlocks } = await $graphql.default.request(query, {
    ...params.value,
  });

  const totalPages = Math.max(Math.ceil(allBlocks.totalCount / limit.value), 1)

  return {
    ...allBlocks,
    totalPages
  };
}, {
  watch: [page],
  // remove
  lazy: true,
});

watch([blocks], ([newPage]) => {
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
      Blocks
    </PageTitle>

    <!-- <div
      class="grid gap-3 bazk:grid-cols-4 bazk:gap-6"
    >
      <Card
        :description="integer.format(blocks.totalCount)"
        label="Mined Blocks"
      />

      <Card
        label="Todo"
        description="-"
      />

      <Card
        label="Todo"
        description="-"
      />

      <Card
        :description="integer.format(blocks.totalCount - 1)"
        label="Last Mined Block Height"
      />
    </div> -->

    <TableContainer>
      <TableRoot
        :pending="pending"
        title="Recent Blocks"
        :rows="blocks?.nodes || []"
        :columns="blocksTableColumns"
      >
        <template
          #empty
        >
          <EmptyTable
            image="/empty/txs.png"
            title="No recent blocks found yet"
            description="We couldn't find any recent blocks"
          />
        </template>

        <template #fees="{ row }">
          <ColumnBlockFees
            v-bind="row"
          />
        </template>

        <template #hash="{ row }">
          <ValueLink
            withCopy
            :label="row.hash"
            :value="row.hash"
            class="max-w-[195px]"
          />
        </template>

        <template #height="{ row }">
          <ColumnLink
            withCopy
            :to="`/blocks/chain/${row.chainId}/height/${row.height}`"
            :label="row.height"
            :value="row.height"
          />
        </template>

        <template #miner="{ row }">
          <ColumnMiner
            :minerData="row.minerData"
          />
        </template>

        <template #status="{ row }">
          <ColumnStatus
            :key="'status-' + row.requestKey"
            :row="row"
          />
        </template>

        <template #createdAt="{ row }">
          <ColumnDate
            :row="row"
          />
        </template>

        <template #icon="{ row }">
          <EyeLink
            :to="`/blocks/chain/${row.chainId}/height/${row.height}`"
          />
        </template>

        <template
          #footer
        >
          <PaginateTable
            itemsLabel="Blocks"
            :currentPage="page"
            :totalItems="blocks.totalCount ?? 1"
            :totalPages="blocks.totalPages"
            @pageChange="updatePage(Number($event), blocks.pageInfo, blocks.totalCount ?? 1, blocks.totalPages)"
          />
        </template>
      </TableRoot>
    </TableContainer>
  </PageRoot>
</template>
