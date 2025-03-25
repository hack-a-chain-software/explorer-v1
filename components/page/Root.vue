<script setup lang="ts">
withDefaults(
  defineProps<{
    error?: any,
  }>(),
  {
    error: null,
  }
)
</script>

<template>
  <div
    class="flex flex-col gap-4 md:gap-6"
  >
    <Error
      v-if="error"
      :error="error"
    />

    <template
      v-else
    >
      <slot />
    </template>
  </div>
</template>
