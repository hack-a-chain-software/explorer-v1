<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    error: any,
    open: boolean,
    loading: boolean,
    items: any,
    cleanup: any,
  }>(),
  {
    error: null,
    open: false,
    loading: false,
  }
)
const isEmpty = computed(() => {
  if (props.items === null) {
    return true
  }
  return Object.values(props.items).every((item: any) => item?.length === 0)
});

const hasBlocks = computed(() => {
  return props.items?.blocks?.length > 0
});

const hasTransactions = computed(() => {
  return props.items?.transactions?.length > 0
});

const hasAddresses = computed(() => {
  return props.items?.addresses?.length > 0
});

const hasTokens = computed(() => {
  return props.items?.tokens?.length > 0
});

const activeFilter = ref('');

const modalRef = ref<any>(null);

const scrollToView = (viewId: string) => {
  activeFilter.value = viewId;
  nextTick(() => {
    const element = document.getElementById(viewId);

    if (element && modalRef.value) {
      const modalContent = modalRef.value;
      const elementPosition = element.offsetTop;
      modalContent.scrollTo({
        top: elementPosition - modalContent.offsetTop - 20,
        behavior: 'smooth'
      });
      activeFilter.value = viewId.split('-')[1];
    }
  });
};
</script>

<template>
  <div
    v-if="open"
    ref="modalRef"
    class="absolute top-full mt-2 w-full right-0 bg-gray-700 rounded-lg border border-gray-300 max-h-[344px] overflow-auto max-w-[580px] z-[99]"
  >
    <div class="sticky top-0 bg-gray-700 z-10 px-4 pt-4">
      <div
        v-if="loading"
        class="pb-4"
      >
        <span
          class="text-sm text-white"
        >
          Loading...
        </span>
      </div>

      <div
        class="pb-4"
        v-else-if="isEmpty"
      >
        <span
          class="text-white text-sm"
        >
          No results found.
        </span>
      </div>

      <div
        v-else
        class="flex gap-2 border-b border-gray-300 pb-4 overflow-auto"
      >
        <SearchViewFilter
          label="Addresses"
          v-if="hasAddresses"
          @click.prevent="scrollToView('search-addresses-view')"
          :isActive="activeFilter === 'address'"
        />

        <SearchViewFilter
          label="Transactions"
          v-if="hasTransactions"
          @click.prevent="scrollToView('search-transactions-view')"
          :isActive="activeFilter === 'transactions'"
        />

        <SearchViewFilter
          label="Tokens"
          v-if="hasTokens"
          @click.prevent="scrollToView('search-tokens-view')"
          :isActive="activeFilter === 'tokens'"
        />

        <SearchViewFilter
          label="Blocks"
          v-if="hasBlocks"
          @click.prevent="scrollToView('search-blocks-view')"
          :isActive="activeFilter === 'blocks'"
        />
      </div>
    </div>

    <div
      @click.prevent="cleanup"
      v-if="!loading && !isEmpty"
      class="flex flex-col p-4 overflow-auto scrollbar-custom min-h-full gap-4 max-w-full overflow-hidden"
    >
      <SearchViewVisible
        v-if="hasAddresses"
        @visible="activeFilter = 'address'"
      >
        <SearchViewAddress id="search-address-view" :addresses="items?.addresses" />
      </SearchViewVisible>

      <SearchViewVisible
        v-if="hasTransactions"
        @visible="activeFilter = 'transactions'"
      >
        <SearchViewTransaction id="search-transactions-view" :transactions="items?.transactions" />
      </SearchViewVisible>

      <SearchViewVisible
        v-if="hasTokens"
        @visible="activeFilter = 'tokens'"
      >
        <SearchViewTokens id="search-tokens-view" :tokens="items?.tokens" />
      </SearchViewVisible>

      <SearchViewVisible
        v-if="hasBlocks"
        @visible="activeFilter = 'blocks'"
      >
        <SearchViewBlock id="search-blocks-view" :blocks="items?.blocks" />
      </SearchViewVisible>
    </div>
  </div>
</template>
