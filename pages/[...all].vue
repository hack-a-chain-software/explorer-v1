<script setup lang="ts">
definePageMeta({
  layout: 'app',
})

useHead({
  title: '404'
})

</script>

<template>
  <div
    class="flex flex-col h-[calc(100vh-120px)] flex items-center justify-center"
  >
    <div
      class="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-2xl max-w-[414px]"
    >
      <Icon404 />

      <div
        class="pt-4 flex flex-col gap-2 text-center"
      >
        <h1
          class="text-font-400 text-2xl font-semibold"
        >
          Oops! Page not found
        </h1>

        <span
          class="text-font-400"
        >
          Sorry, we couldn't find the page you where looking for
        </span>
      </div>

      <div
        class="pt-6"
      >
        <NuxtLink
          to="/"
        >
          <Button
            size="large"
            type="filled"
            label="Back home"
          />
        </NuxtLink>
      </div>
    </div>

    <div
      class="fixed bottom-0 blockskull shrink-0 w-full z-[-1]"
    />
  </div>
</template>

<style >
  .blockskull {
    height: 420px;
    background: linear-gradient(to bottom, #000000 25%, #004d00 100%);
  }
</style>
