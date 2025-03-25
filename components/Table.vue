<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rows: any[],
    columns: any[],
    pending?: boolean,
  }>(),
  {
    pending: false,
    //
  }
)

const emit = defineEmits(['rowClick'])
</script>

<template>
  <div>
    <div
      class="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-2 bazk:gap-4 px-3 bazk:px-4 py-2"
    >
      <div
        v-for="column in props.columns"
        :key="column.key"
        :class="column.center && 'text-center'"
        :style="{ gridColumn: `span ${column.cols} / span ${column.cols}` }"
      >
        <span
          class="text-font-500 text-xs font-semibold leading-[150%] h-[18px] block"
        >
          {{ column.label }}
        </span>
      </div>
    </div>

    <div
      class="border-t border-t-gray-300"
    >
      <template
        v-if="pending"
      >
        <div
          v-for="row in 20"
          :key="`table-skeleton-row-${row}`"
          class="grid grid-cols-[repeat(24,minmax(0,1fr))] px-3 bazk:px-4 py-2 gap-2 bazk:gap-4 border-b border-b-gray-300 justify-between"
        >
          <div
            :key="index"
            class="h-[28px] flex items-center justify-center"
            v-for="(column, index) in props.columns"
            :style="{ gridColumn: `span ${column.cols} / span ${column.cols}` }"
          >
            <div
              class="bg-blue-400 h-[20px] bg-gray-200 rounded pulse w-full"
            />
          </div>
        </div>
      </template>

      <template
        v-else
      >
        <div
          v-for="(row, rowIndex) in rows"
          :key="row.requestKey"
          @click.prevent="emit('rowClick', row)"
          class="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-2 bazk:gap-4 px-3 bazk:px-4 py-2 border-b border-b-gray-300 justify-between hover:bg-gray-700"
        >
          <div
            :key="index"
            v-for="(column, index) in props.columns"
            :style="{ gridColumn: `span ${column.cols} / span ${column.cols}` }"
            class="text-font-450 flex items-center"
            :class="column.center && 'text-center justify-center'"
          >
            <slot
              :name="column.key"
              :row="row"
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
    </div>
  </div>
</template>
