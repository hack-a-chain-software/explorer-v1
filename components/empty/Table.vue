<script lang="ts" setup>
withDefaults(
  defineProps<{
    image: string,
    title: string,
    description: string,
  }>(),
  {
    image: '/empty/nft.png'
  }
)
</script>

<template>
  <div
    class="w-full h-[430px] gap-6 flex flex-col items-center justify-center"
  >
    <img
      :src="image"
      class="w-[190px] h-[190px]"
    />

    <div
      class="text-center flex flex-col gap-2"
    >
      <span
        class="text-lg font-medium text-font-400"
      >
        {{ title }}
      </span>

      <span
        class="text-font-500"
      >
        {{ description }}
      </span>
    </div>
  </div>
</template>
