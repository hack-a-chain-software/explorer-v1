<script setup lang="ts">
import '@fontsource/inter/latin.css'
import '@fontsource/roboto/latin.css'

useHead({
  titleTemplate: title => title || 'Kadscan: Block Explorer',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Explore and verify data on Kadscan. View detailed information about transfers, transactions, and blocks on the Kadena blockchain.'
    },
    {
      hid: 'robots',
      name: 'robots',
      content: 'index, follow'
    },
    {
      hid: 'googlebot',
      name: 'googlebot',
      content: 'index, follow'
    }
  ]
})

</script>

<template>
  <Html lang="en" />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  body {
    background-color: #010101;
    height: 100%;

  }

  html {
    height: 100%;
  }

  body::-webkit-scrollbar {
    -webkit-appearance: none !important;
    width: 7px !important;
  }

  body::-webkit-scrollbar-thumb {
    border-radius: 20px !important;
    background-color: #525454 !important;
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.836) !important;
  }

 .scrollbar-custom::-webkit-scrollbar {
    -webkit-appearance: none !important;
    width: 8px !important;
  }

  .scrollbar-custom::-webkit-scrollbar-thumb {
    border-radius: 20px !important;
    background-color: #202327cc !important;
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5) !important;
  }
</style>
