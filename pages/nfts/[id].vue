<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import { TabPanel } from '@headlessui/vue'

definePageMeta({
  layout: 'app',
})

useHead({
  title: 'NFT Details'
})

const data = reactive({
  tabs: [
    {
      key: 'properties',
      label: 'Properties',
    },
    // {
    //   disabled: true,
    //   key: 'activity',
    //   label: 'Activity',
    // },
    // {
    //   key: 'more',
    //   disabled: true,
    //   label: 'More from this Collection',
    // },
  ],
})

const query = gql`
  query GetNftById($id: Int!) {
    contractById(id: $id) {
      chainId
      createdAt
      id
      metadata
      module
      network
      precision
      tokenId
      updatedAt
      type
    }
  }
`

const route = useRoute()

const { $graphql } = useNuxtApp();

const { data: nft, error } = await useAsyncData('nft-detail', async () => {
  const res = await $graphql.default.request(query, {
    id: Number(route.params.id),
  });

  return res.contractById
});

if (!nft.value && !error.value) {
  await navigateTo('/404')
}
</script>

<template>
  <PageRoot
    :error="error"
  >
    <NftDetails
      :contract="nft"
    />

    <PageContainer>
      <Tabs
        :tabs="data.tabs"
      >
        <template
          #button
        >
          <NuxtLink
            to="/collections/1"
          >
            <Button
              size="medium"
              label="View full collection"
            />
          </NuxtLink>
        </template>

        <TabPanel>
          <NftProperties
            :contract="nft"
          />
        </TabPanel>

        <!-- <TabPanel>
          <NftActivity />
        </TabPanel>

        <TabPanel>
          <NftMore />
        </TabPanel> -->
      </Tabs>
    </PageContainer>
  </PageRoot>
</template>

