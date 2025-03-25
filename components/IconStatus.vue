<script setup lang="ts">
import { IconClose, IconSuccess } from '#components';

const props = withDefaults(
  defineProps<{
    status: 'success' | 'error',
  }>(),
  {
    status: "success",
  }
)
</script>

<template>
  <div
    class="h-12 w-12 bg-gray-600 rounded-lg flex items-center justify-center shrink-0"
  >
    <component :is="props.status === 'success' ? IconSuccess : IconClose" />
  </div>
</template>
