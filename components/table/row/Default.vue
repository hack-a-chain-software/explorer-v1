<script setup lang="ts">
const props = defineProps<{
  row: any;
  columns: any;
  rowIndex: any;
  isLast?: any,
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <div
    @click.prevent="emit('click')"
    :class="[isLast && '!border-b border-b-gray-300']"
    class="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-4 px-3 bazk:px-4 py-2 justify-between hover:bg-gray-700 group"
  >
    <div
      :key="index"
      v-for="(column, index) in columns"
      :style="{ gridColumn: `span ${column.cols} / span ${column.cols}` }"
      class="text-font-450 flex items-center bg-gray-800 group-hover:bg-gray-700 text-sm text-font-450"
      :class="[column.center && 'text-center justify-center', !!column.isFixed && 'sticky left-0']"
    >
      <slot
        :row="row"
        :name="column.key"
        :order="rowIndex"
      >
        <span
          class="text-font-450 text-sm truncate"
        >
          {{ row[column.key] }}
        </span>
      </slot>
    </div>
  </div>
</template>
