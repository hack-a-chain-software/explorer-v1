<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    delta?: number,
    suffix?: string;
    isDark?: boolean;
    isLoading?: boolean;
    description?: string | number;
  }>(),
  {
    label: '',
    suffix: '',
    description: '',
    isDark: false,
    isLoading: true,
  }
)
</script>

<template>
  <div
    :class="isDark && 'bg-gray-800'"
    class="p-3 lg:p-6 flex flex-col gap-3 lg:gap-4 rounded-lg"
  >
    <div
      class="flex items-center justify-between gap-2 py-px min-h-[26px]"
    >
      <span
        class="text-sm lg:text-base text-font-500 lg:font-[500]"
      >
        {{ label }}
      </span>

      <div
        v-if="delta && !isLoading"
        class="px-2 py-1 bg-gray-900 rounded"
      >
        <span
          class="text-xs block"
          :class="delta < 0 ? 'text-system-red' : 'text-system-green'"
        >
            {{ delta.toFixed(2) }}%
        </span>

      </div>
    </div>

    <div
      class="text-font-400 flex items-end gap-1"
    >
      <template
        v-if="!isLoading"
      >
        <span
          class="text-xl lg:text-2xl lg:leading-[100%] font-medium lg:font-semibold"
        >
          {{ description }}
        </span>

        <span
          v-if="suffix"
          class="text-[14px] font-[500]"
        >
          {{ suffix }}
        </span>
      </template>

      <div
        v-else
        class="bg-gray-200 h-[24px] rounded w-full"
      />
    </div>
  </div>
</template>
