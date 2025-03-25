<script setup lang="ts">
withDefaults(
  defineProps<{
    totalItems: number;
    itemsLabel?: string;
    totalPages?: number;
    currentPage?: number;
    itemsPerPage?: number;
  }>(),
  {
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 20,
    itemsLabel: 'Transactions',
  }
)

const emit = defineEmits(['pageChange'])

const buttons = [
  'first',
  'prev',
  'overview',
  'next',
  'last'
]
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 pt-6"
  >
    <div>
      <span
        class="text-sm leading-[150%] text-font-500"
      >
        Showing {{ itemsPerPage }} of {{ totalItems }} {{ itemsLabel }}
      </span>
    </div>

    <div
      class="flex items-center justify-center gap-2"
    >
      <PaginateButton
        :key="button"
        :button="button"
        :totalPages="totalPages"
        :currentPage="currentPage"
        v-for="button in buttons"
        @click="emit('pageChange', $event)"
      />
    </div>
  </div>
</template>
