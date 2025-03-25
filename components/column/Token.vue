<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id?: string,
    icon?: string,
    name?: string,
    module?: string,
    symbol?: string,
    withSymbol?: boolean,
  }>(),
  {
    withSymbol: true
  }
)
</script>

<template>
  <NuxtLink
    :to="(id || module) ? `/tokens/${id || module}` : ''"
    :class="!(id || module) && 'opacity-[.6] cursor-not-allowed'"
  >
    <div
      class="flex items-center gap-2"
    >
      <div
        class="h-6 w-6 rounded shrink-0"
      >
        <img
          v-if="icon"
          :src="icon"
        />

        <div
          v-else
          class="w-full h-full bg-gray-300 rounded"
        />
      </div>

      <div
        class="flex gap-2 items-end"
      >
        <span
          class="text-sm text-font-400 whitespace-nowrap"
        >
          {{ name }}
        </span>

        <span
          v-if="symbol && withSymbol"
          class="text-font-500 text-xs font-medium uppercase"
        >
          {{ symbol }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
