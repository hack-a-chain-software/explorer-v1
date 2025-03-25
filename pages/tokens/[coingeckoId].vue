<script setup lang="ts">
import { TabPanel } from '@headlessui/vue'

definePageMeta({
  layout: 'app',
})

useHead({
  title: 'Token Details'
})

const data = reactive({
  tabs: [
    {
      key: 'info',
      label: 'Info',
    },
    {
      key: 'holders',
      label: 'Holders',
    },
    {
      key: 'transfers',
      label: 'Transfers',
    },
  ],
})

const route = useRoute()

const { $coingecko } = useNuxtApp();

const { data: token, error } = await useAsyncData('token-trending', async () => {
  const res = await $coingecko.request(`coins/${route.params.coingeckoId}`, {
    vs_currency: 'usd',
    category: 'kadena-ecosystem',
  });

  if (['coin', 'kadena'].includes(route.params.coingeckoId)) {
    res.contract_address = 'coin';
  }

  if (res) {
    return res;
  }

  const staticMetadata = staticTokens.find(({ module }) => module === route.params.coingeckoId);

  return {
    name: staticMetadata?.name,
    image: staticMetadata ? {
      large: staticMetadata?.icon,
    } : undefined,
    symbol: staticMetadata?.symbol,
    contract_address: staticMetadata?.module || route.params.coingeckoId,
  };
});

if (!token.value && !error.value) {
  await navigateTo('/404')
}
</script>

<template>
  <PageRoot
    :error="error"
  >
    <PageContainer>
      <TokenDetails
        v-bind="token"
        :modulename="token.contract_address"
      />
    </PageContainer>

    <PageContainer>
      <Tabs
        :tabs="data.tabs"
      >
        <!-- <template
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
        </template> -->

        <TabPanel>
          <TokenInfo
            v-bind="token"
          />
        </TabPanel>

        <TabPanel>
          <TokenHolders
            v-bind="token"
            :modulename="token.contract_address"
          />
        </TabPanel>

        <TabPanel>
          <TokenTransfers
            :symbol="token.symbol || token.contract_address"
            :modulename="token.contract_address"
          />
        </TabPanel>
      </Tabs>
    </PageContainer>
  </PageRoot>
</template>
