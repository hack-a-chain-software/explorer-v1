<script setup lang="ts">
import { provideUseId, TabGroup, TabList, Tab, TabPanels } from '@headlessui/vue'

const props = withDefaults(
  defineProps<{
    tabs: any,
  }>(),
  {
    tabs: []
  }
)

const route = useRoute()
const router = useRouter()

const selectedIndex = ref(0);

const updateURL = async (index: number) => {
  const tabKey = props.tabs[index].key

  const { page, cursor, ...newQuery}: any = { ...route.query, tab: tabKey };

  await router.replace({ query: newQuery });

  selectedIndex.value = index;
}

watch(() => route.query.tab, (newTab) => {
  const index = props.tabs.findIndex((tab: any) => tab.key === newTab)
  if (index !== -1) {
    selectedIndex.value = index
  }
}, { immediate: true })

watch(selectedIndex, (newIndex) => {
  updateURL(newIndex)
})

onMounted(() => {
  const tabFromURL = route.query.tab as string
  const index = props.tabs.findIndex((tab: any) => tab.key === tabFromURL)
  selectedIndex.value = index !== -1 ? index : 0
  updateURL(selectedIndex.value)
})

provideUseId(() => useId())
</script>

<template>
  <div>
    <TabGroup :selectedIndex="selectedIndex" @change="updateURL($event)">
      <div
        class="flex justify-between gap-4 max-w-full overflow-auto"
      >
        <TabList class="flex items-center gap-4 md:gap-6">
          <Tab
            v-for="tab in tabs"
            as="template"
            :key="tab.key"
            :disabled="tab.disabled"
            v-slot="{ selected }"
          >
            <button
              :class="[
                'pb-[6px] md:pb-[10px] px-3 md:px-3 outline-none box-border border-b-[2px] shrink-0 disabled:cursor-not-allowed disabled:opacity-[0.8]',
                selected
                  ? 'text-font-400  border-b-kadscan-500'
                  : 'text-font-500 border-b-transparent hover:text-kadscan-500',
              ]"
            >
              <span
                class="block text-sm leading-[19.6px] md:text-base md:leading-[22px]"
              >
                {{ tab.label }}
              </span>
            </button>
          </Tab>
        </TabList>
        <!-- <slot name="button" /> -->
      </div>

      <TabPanels class="pt-4 md:pt-8 w-full break-words">
        <slot />
      </TabPanels>
    </TabGroup>
  </div>
</template>
