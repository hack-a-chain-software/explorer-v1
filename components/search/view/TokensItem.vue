<script setup lang="ts">
const props = defineProps<{
  module: string,
}>()

const metadata = computed(() => {
  return staticTokens.find(({ module }) => module === props.module) || unknownToken
})
</script>

<template>
  <NuxtLink
    :to="metadata?.id ? `/tokens/${metadata.id}` : `/tokens/${module}`"
    class="flex items-center justify-between w-full"
  >
    <div
      class="flex items-center gap-2"
    >
      <div
        class="h-6 w-6 rounded shrink-0"
      >
        <img
          v-if="metadata.icon"
          :src="metadata.icon"
          class="rounded-full"
        />

        <div
          v-else
          class="w-full h-full bg-gray-300 rounded"
        />
      </div>

      <div
        class="flex gap-2 items-end w-full truncate"
      >
        <span
          class="text-sm text-font-400 truncate block"
        >
          {{ metadata.name }}
        </span>

        <span
          v-if="metadata.symbol"
          class="text-font-400 text-sm font-medium uppercase"
        >
          ({{ metadata.symbol }})
        </span>
      </div>
    </div>

    <div>
      <span
        class="text-font-400 text-sm font-medium"
      >
        {{ module }}
      </span>
    </div>
  </NuxtLink>
</template>
