<script setup lang="ts">
withDefaults(
  defineProps<{
    image?: string,
    classRoot?: string,
  }>(),
  {
    classRoot: 'aspect-square min-w-full bg-gray-200 pulse w-full'
  }
)
</script>

<template>
  <div
    v-if="!image"
    :class="classRoot"
  />

  <video
    autoplay muted loop
    :class="classRoot"
    v-else-if="image.match(/\.(mp4|webm|ogg)$/i)"
  >
    <source :src="image" />
  </video>

  <img
    v-else
    :src="image"
    :class="classRoot"
  />
</template>
