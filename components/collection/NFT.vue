<script setup lang="ts">
defineProps<{
  items?: any
}>()
</script>

<template>
  <div>
    <div
      v-if="items"
      class="
        gap-2
        bazk:gap-4
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 bazk:grid-cols-5
      "
    >
      <NftCard
        v-bind="item"
        v-for="item in items"
        :key="'nft:' + item.id"
      />
    </div>

    <PaginateTable
      itemsLabel="NFT's"
      :currentPage="1"
      :totalItems="2000"
      :totalPages="10"
    />
  </div>
</template>
