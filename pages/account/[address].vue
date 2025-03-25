<script setup lang="ts">
import { TabPanel } from '@headlessui/vue'
import { gql } from 'nuxt-graphql-request/utils';

definePageMeta({
  layout: 'app',
})

useHead({
  title: 'Account Details'
})

const route = useRoute()

const {
  address
} = route.params

const data = reactive({
  tabs: [
    {
      key: 'assets',
      label: 'Assets',
    },
    {
      key: 'nft',
      label: 'NFT',
    },
    {
      key: 'transactions',
      label: 'Transactions',
    },
    // {
    //   key: 'statement',
    //   label: 'Account Statement',
    // },
  ],
})

/**
 * The API needs to be changed so that tokens can be computed using pagination,
 * Now, is necessary to load all tokens and compute on Front the balance of each token
 */
const query = gql`
  query GetBalanceByAccount($account: String!) {
    allBalances(
      condition: {tokenId: null, account: $account}
    ) {
      nodes {
        account
        balance
        chainId
        createdAt
        module
        nodeId
        network
        qualname
        tokenId
        updatedAt
        transactionsCount
        polyfungiblesCount
        fungiblesCount
      }
    }
  }
`

const { $graphql, $coingecko } = useNuxtApp();

const { data: queryData, error } = await useAsyncData('account-balances-etl', async () => {
  const [
    apiRes,
    prices,
  ] = await Promise.all([
    $graphql.default.request(query, {
      // "k:84acac0b72e81e617ee417a55b16cdaa9cbcd3ff8fffd1296cb09376a7916d40",
      account: address,
    }),
    $coingecko.request('coins/markets', {
      vs_currency: 'usd',
      category: 'kadena-ecosystem',
    })
  ])

  const {
    allBalances,
  } = apiRes

  return {
    balances: transformRawBalances({ allBalances, prices}),
    fungiblesCount: allBalances?.nodes[0]?.fungiblesCount || 0,
    totalTransactions: allBalances?.nodes[0]?.transactionsCount || 0,
    polyfungiblesCount: allBalances?.nodes[0]?.polyfungiblesCount || 0
  }
});

const tabs = computed(() => {
  return [
    {
      key: 'assets',
      label: `Assets (${queryData.value?.balances.length || 0})`,
    },
    {
      key: 'nft',
      label: `NFT (${queryData.value?.polyfungiblesCount})`,
    },
    {
      key: 'transactions',
      label: `Transactions (${queryData.value?.totalTransactions})`,
    },
  ]
})
</script>

<template>
  <PageRoot
    :error="error"
  >
    <PageTitle>
      Account Details
    </PageTitle>

    <PageContainer>
      <AccountDetails
        :address="address + ''"
        :balances="queryData?.balances"
        :totalTransactions="queryData?.totalTransactions"
      />
    </PageContainer>

    <PageContainer>
      <Tabs
        :tabs="tabs"
      >
        <TabPanel>
          <AccountAssets
            :balances="queryData?.balances"
            :address="(address as string)"
          />
        </TabPanel>

        <TabPanel>
          <AccountNFT
            :address="address + ''"
          />
        </TabPanel>

        <TabPanel>
          <AccountTransactions
            :address="address + ''"
          />
        </TabPanel>

        <!-- <TabPanel>
          <AccountStatement />
        </TabPanel> -->
      </Tabs>
    </PageContainer>
  </PageRoot>
</template>
