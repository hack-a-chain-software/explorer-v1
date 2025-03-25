<script setup lang="ts">
defineProps<{
  transactions: any,
}>()
</script>

<template>
  <div
    class="flex flex-col gap-2"
  >
    <div
      class="pb-2"
    >
      <span
        class="text-white text-sm"
      >
        Transactions
      </span>
    </div>

    <SearchViewTransactionItem
      v-bind="transaction"
      class="py-3"
      :key="'transaction:'+transaction.id"
      v-for="(transaction, i) in transactions"
      :class="[!((i + 1) === transactions.length) && '!border-b border-b-gray-300']"
    />
  </div>
</template>
