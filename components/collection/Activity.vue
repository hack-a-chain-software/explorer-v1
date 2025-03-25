<script setup lang="ts">
const {
  collectionActivityTableColumns
} = useAppConfig()

const data = reactive({
  page: 1,
  totalPages: 1,
  pending: false,
  totalCount: 20,
})

const {
  mockCollectionTxs
} = useAppConfig()
</script>

<template>
  <div
    class="py-3 bazk:p-6 rounded-lg bazk:rounded-2xl border border-gray-300"
  >
    <TableRoot
      :class="data.pending && 'bg-white'"
      :rows="mockCollectionTxs"
      :columns="collectionActivityTableColumns"
    >
      <template #price="{ row }">
        <ColumnPrice
          v-bind="row"
        />
      </template>

      <template #from="{ row }">
        <ColumnAddress
          :value="row.from"
        />
      </template>

      <template #to="{ row }">
        <ColumnAddress
          :value="row.to"
        />
      </template>

      <template #date="{ row }">
        <ColumnDate
          :row="row"
        />
      </template>

      <template #item="{ row }">
        <ColumnNft
          v-bind="row"
        />
      </template>

      <template #icon>
        <div
          class="w-6 h-full group hover:bg-gray-500 rounded grid items-center justify-center"
        >
          <IconEye
            class="mx-auto text-white group-hover:text-kadscan-500 transition"
          />
        </div>
      </template>
    </TableRoot>

    <PaginateTable
      class="px-3 bazk:px-0"
      :currentPage="data.page"
      :totalItems="data.totalCount ?? 1"
      :totalPages="data.totalPages"
      @pageChange="data.page = Number($event)"
    />
  </div>
</template>
