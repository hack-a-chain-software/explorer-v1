<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div
    class="h-screen flex flex-col items-center !font-sans"
  >
    <div
      class="w-full bg-blue-400"
    >
      <HeaderTopbar/>
    </div>

    <div
      class="
        w-full max-w-[1352px] grow
        px-4
        pt-4 md:pt-6
        pb-[60px] md:pb-[38px]
      "
    >
      <slot />
    </div>

    <Footer
      v-if="route.name !== 'all'"
    />
  </div>
</template>
