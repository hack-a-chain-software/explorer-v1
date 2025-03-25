<script setup lang="ts">
import { TabPanel } from '@headlessui/vue'

definePageMeta({
  layout: 'app',
})

useHead({
  title: 'NFT Collection'
})

const data = reactive({
  tabs: [
    {
      key: 'items',
      label: 'Items',
    },
    {
      key: 'activity',
      label: 'Activity',
    },
  ],
})

const {
  mockCollectionNFTs,
} = useAppConfig()
</script>

<template>
  <PageRoot>
    <CollectionHeader />

    <PageContainer>
      <Tabs
        :tabs="data.tabs"
      >
        <TabPanel>
          <CollectionNFT
            :items="mockCollectionNFTs"
          />
        </TabPanel>

        <TabPanel>
          <CollectionActivity />
        </TabPanel>
      </Tabs>
    </PageContainer>
  </PageRoot>
</template>
