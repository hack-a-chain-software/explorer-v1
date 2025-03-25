<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items: any[],
    pending?: boolean,
  }>(),
  {
    pending: false,
  }
)

const slots = useSlots();

const filteredSlots = computed(() => {
  return Object.keys(slots).filter(name => !['default', 'row'].includes(name))
})

const emit = defineEmits(['rowClick'])
</script>

<template>
  <div>
    <div
      class="max-w-full overflow-auto w-full"
    >
      <div
        class="relative"
      >
        <div
          v-if="pending"
        >
          <div
            class="
              grid grid-cols-2 gap-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-4
              xl:grid-cols-5 xl:gap-4
            "
          >
            <div
              v-for="row in 10"
              :key="`table-skeleton-nfts-row-${row}`"
              class="nft-card bg-gray-200 pulse h-[334px] rounded-lg"
            />
          </div>
        </div>

        <div
          v-else-if="!pending && items?.length === 0"
        >
          <slot
            name="empty"
          />
        </div>

        <div
          v-else
          class="
            grid grid-cols-2 gap-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-4
            xl:grid-cols-5 xl:gap-4
          "
        >
          <NftCard
            :key="item.id"
            v-for="item in items"
            :contract="item.contractByContractId"
          />
        </div>
      </div>
    </div>

    <div
      v-if="items?.length > 0"
      class="pt-2"
    >
      <slot
        name="footer"
      />
    </div>
  </div>
</template>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(152px, 238px));
  grid-gap: 4px; /* Espaçamento entre as colunas */
  justify-content: center; /* Alinha o grid horizontalmente ao centro, você pode ajustar conforme necessário */
  padding: 8px; /* Espaçamento interno */
}
.nft-card {
  max-width: 238px;
  min-width: 152px;
  width: 100%;
}
</style>
