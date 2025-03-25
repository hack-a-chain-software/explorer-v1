<script setup lang="ts">
const {
  nftActivityTableColumns
} = useAppConfig()

const rows = [
  {
    activity: 'List',
    amount: "10,21 KDA",
    dollar: "$ 1,55",
    createdAt: 1712954633979,
    name: 'The Angel Doggos',
    collection: 'Hack a Collection',
    image: '/collection/doggos.png',
    hash: 'bOSdGKpPS5OYiF2HgVc_dBQPPfj-b_LuVbEnXnuDL1Q',
    to: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
    from: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
  },
  {
    activity: 'Trade',
    amount: "10,21 KDA",
    dollar: "$ 1,55",
    name: 'Kadena Bears',
    image: '/collection/bears.png',
    createdAt: 1712954633979,
    collection: 'Hack a Collection',
    hash: 'bOSdGKpPS5OYiF2HgVc_dBQPPfj-b_LuVbEnXnuDL1Q',
    to: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
    from: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
  },
  {
    activity: 'Send',
    amount: "10,21 KDA",
    dollar: "$ 1,55",
    name: 'Brawler Bears',
    image: '/collection/brwalers.png',
    createdAt: 1712954633979,
    collection: 'Hack a Collection',
    hash: 'bOSdGKpPS5OYiF2HgVc_dBQPPfj-b_LuVbEnXnuDL1Q',
    to: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
    from: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
  },
  {
    activity: 'Trade',
    amount: "10,21 KDA",
    dollar: "$ 1,55",
    name: 'Boxing Badger',
    image: '/collection/badger.png',
    createdAt: 1712954633979,
    collection: 'Hack a Collection',
    hash: 'bOSdGKpPS5OYiF2HgVc_dBQPPfj-b_LuVbEnXnuDL1Q',
    to: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
    from: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
  },
  {
    activity: 'List',
    amount: "10,21 KDA",
    dollar: "$ 1,55",
    name: 'Kadena Mining Club',
    image: '/collection/mining.png',
    createdAt: 1712954633979,
    collection: 'Hack a Collection',
    hash: 'bOSdGKpPS5OYiF2HgVc_dBQPPfj-b_LuVbEnXnuDL1Q',
    to: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
    from: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
  },
  {
    activity: 'Trade',
    amount: "10,21 KDA",
    dollar: "$ 1,55",
    name: 'Kadena Komodos',
    image: '/collection/komodos.png',
    createdAt: 1712954633979,
    collection: 'Hack a Collection',
    hash: 'bOSdGKpPS5OYiF2HgVc_dBQPPfj-b_LuVbEnXnuDL1Q',
    to: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
    from: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
  },
  {
    activity: 'List',
    amount: "10,21 KDA",
    dollar: "$ 1,55",
    name: 'JODIE INU',
    image: '/collection/inu.png',
    createdAt: 1712954633979,
    collection: 'Hack a Collection',
    hash: 'bOSdGKpPS5OYiF2HgVc_dBQPPfj-b_LuVbEnXnuDL1Q',
    to: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
    from: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
  },
  {
    activity: 'Mint',
    amount: "10,21 KDA",
    dollar: "$ 1,55",
    name: 'INU Crew',
    image: '/collection/inu.png',
    createdAt: 1712954633979,
    collection: 'Hack a Collection',
    hash: 'bOSdGKpPS5OYiF2HgVc_dBQPPfj-b_LuVbEnXnuDL1Q',
    to: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
    from: 'k:685357523ce9b43de4fa5b1e7041afa19df3e40e43d7e8f9cf2e1175a95835b7',
  },
]

const data = reactive({
  page: 1,
  totalPages: 1,
  pending: false,
  totalCount: 20,
})
</script>

<template>
  <div
    class="py-3 bazk:p-6 rounded-lg bazk:rounded-2xl border border-gray-300"
  >
    <TableRoot
      :class="data.pending && 'bg-white'"
      :rows="rows"
      :columns="nftActivityTableColumns"
    >
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

      <template #activity="{ row }">
        <ColumnActivity
          :value="row.activity"
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

    <!-- <PaginateTable
      :currentPage="data.page"
      :totalItems="data.totalCount ?? 1"
      :totalPages="data.totalPages"
      @pageChange="data.page = Number($event)"
    /> -->
  </div>
</template>
