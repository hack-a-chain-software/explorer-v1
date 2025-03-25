<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';

const {
  statementTableColumns
} = useAppConfig()

const data = reactive({
  date: null,
})

const query = gql`
  query GetTransactions($first: Int, $offset: Int) {
    allTransactions(offset: $offset, orderBy: ID_DESC, first: $first) {
      nodes {
        chainid
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
  pending,
  data: transactions,
} = await usePaginate({
  query,
  key: 'allTransactions'
})
</script>

<template>
  <div
    class="py-3 bazk:p-6 rounded-lg bazk:rounded-2xl border border-gray-300 gap-4 flex flex-col"
  >
    <div
      class="px-3 bazk:px-0"
    >
      <DatePicker
        v-model="data.date"
        class="relative z-[999]"
      />
    </div>

    <TableRoot
      :pending="pending"
      :rows="transactions?.nodes || []"
      :columns="statementTableColumns"
    >
      <template #createdAt="{ row }">
        <ColumnDate
          :row="row"
        />
      </template>

      <template #description>
        <!-- <ColumnAddress
          value="TODO"
        /> -->
        <span>
          - todo -
        </span>
      </template>

      <template #amount>
        <!-- <ColumnAddress
          value="TODO"
        /> -->
        <span>
          - todo -
        </span>
      </template>

      <template #balance>
        <!-- <ColumnAddress
          value="TODO"
        /> -->
        <span>
          - todo -
        </span>
      </template>
    </TableRoot>

    <PaginateTable
      itemsLabel="Transactions"
      :currentPage="page"
      class="px-3 bazk:px-0"
      :totalItems="transactions.totalCount ?? 1"
      :totalPages="transactions.totalPages"
      @pageChange="page = Number($event)"
    />
  </div>
</template>
