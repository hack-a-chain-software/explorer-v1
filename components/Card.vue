<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    float?: string,
    suffix?: string;
    delta?: number;
    isLoading?: boolean;
    description?: string | number;
  }>(),
  {
    label: '',
    suffix: '',
    description: '',
    isLoading: false,
  }
)
</script>

<template>
  <div
    class="p-4 bazk:p-6 flex flex-col gap-1 bazk:gap-2.5 rounded-lg bg-gray-800"
  >
    <div
      class="flex items-center justify-between gap-2"
    >
      <span
        class="text-xs leading-[18px] text-font-500 bazk:text-sm"
      >
        {{ label }}
      </span>
    </div>

    <div
      class="flex items-center justify-between gap-2"
    >
      <template
        v-if="!isLoading"
      >
        <div
          class="flex items-center justify-between text-font-400 flex items-end gap-1"
        >
          <span
            class="text-lg bazk:text-2xl leading-[100%] font-[600]"
          >
            {{ description }}
          </span>

          <span
            v-if="suffix"
            class="text-xs bazk:text-[14px] font-[500]"
          >
            {{ suffix }}
          </span>
        </div>

        <div
          v-if="delta"
          class="px-2 py-1 bg-gray-900 rounded"
        >
          <span
            class="text-xs block"
            :class="delta < 0 ? 'text-system-red' : 'text-system-green'"
          >
            {{ delta.toFixed(2) }}%
          </span>
        </div>
      </template>

      <div
        v-else
        class="bg-gray-200 h-[34px] rounded w-full"
      />
    </div>
  </div>
</template>
