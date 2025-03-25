<script setup lang="ts">
defineProps<{
  to: string,
}>();
</script>

<template>
  <NuxtLink
    :to="to"
  >
    <div
      class="w-6 h-full group hover:bg-gray-500 rounded grid items-center justify-center"
    >
      <IconEye
        class="mx-auto text-white group-hover:text-kadscan-500 transition"
      />
    </div>
  </NuxtLink>
</template>
