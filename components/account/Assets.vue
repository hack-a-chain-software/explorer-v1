<script setup lang="ts">
defineProps<{
  address: string,
  balances: any
}>()

const {
  assetsTableColumns,
  assetsTableSubColumns
} = useAppConfig()

// const data = reactive({
//   currentPage: 1,
//   totalPages: 15,
// })
</script>

<template>
  <div
    class="py-3 md:p-6 rounded-lg md:rounded-2xl border border-gray-300"
  >
    <TableRoot
      :rows="balances"
      :isFull="true"
      :mobileWithoutHeader="true"
      :columns="assetsTableColumns"
    >
      <template #row="{ row, columns, rowIndex, isLast }">
        <TableRowExpansible
          :row="row"
          :isLast="isLast"
          :columns="columns"
          :rowIndex="rowIndex"
          :subColumns="assetsTableSubColumns"
        >
          <template #asset="{ row }">
            <ColumnToken
              v-bind="row.metadata"
              :withSymbol="false"
            />
          </template>

          <template #symbol="{ row }">
            <span
              class="uppercase"
            >
              {{ row.symbol }}
            </span>
          </template>

          <template #price="{ row }">
            <ColumnPrice
              :label="row.current_price"
              :delta="row.price_change_percentage_24h"
            />
          </template>

          <template #balance="{ row }">
            {{ integer.format(row.balance) }}
          </template>

          <template #value="{ row }">
            {{ row.current_price ? money.format(row.balance * row.current_price) : '-' }}
          </template>

          <template #distribution="{ open }">
            <div
              :class="[open && 'bg-gray-500']"
              class="w-8 h-8 group hover:bg-gray-500 rounded grid items-center justify-center"
            >
              <IconArrow
                :class="[open && 'rotate-90 text-kadscan-500']"
                class="mx-auto -rotate-90 group-hover:text-kadscan-500 transition"
              />
            </div>
          </template>
        </TableRowExpansible>
      </template>

      <template
        #empty
      >
        <EmptyTable
          image="/empty/txs.png"
          title="No assets found for this account"
          description="We couldn't find any assets for this account"
        />
      </template>
    </TableRoot>

    <!-- <PaginateTable
      itemsLabel="Tokens"
      :totalItems="180"
      :currentPage="data.currentPage"
      :totalPages="data.totalPages"
      @pageChange="data.currentPage = $event"
    /> -->
  </div>
</template>
