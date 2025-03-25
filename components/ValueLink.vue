<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string,
    truncate?:boolean,
    withCopy?: boolean,
    label: string | number,
    value?: string | number,
  }>(),
  {
    to: '',
    truncate: true,
    withCopy: false,
  }
)
</script>

<template>
  <NuxtLink
    :to="to"
    class="max-w-full flex gap-1 items-center"
  >
    <div
      :class="truncate && 'truncate'"
      class="max-w-full"
    >
      <span
        class=" text-sm"
        :class="[to ? 'hover:text-kadscan-500 text-font-400' : 'text-font-450']"
      >
        {{ label }}
      </span>
    </div>

    <div
      v-if="withCopy"
      class="shrink-0"
    >
      <Copy
        isSmall
        :value="value"
      />
    </div>
  </NuxtLink>
</template>
