<script lang="ts" setup>
const props = defineProps<{
  button: string,
  totalPages: string | number,
  currentPage: string | number,
}>()

const emit = defineEmits(['click'])

const isOverview = computed(() => props.button === 'overview')

const isNextOrPrev = computed(() => ['next', 'prev'].includes(props.button))

const label = computed(() => {
  if (isOverview.value) {
    return `Page ${props.currentPage} of ${props.totalPages}`
  }

  return props.button
})

const click = () => {
  if (isNextOrPrev.value) {
    const nextPage = props.button === 'prev'
      ? Math.max(+props.currentPage - 1, 1)
      : Math.min(+props.currentPage + 1, +props.totalPages)

    emit('click', nextPage)

    return
  }

  emit('click', props.button === 'first' ? 1 : +props.totalPages)
}
</script>

<template>
  <button
    :disabled="isOverview"
    @click.prevent="click()"
    class="
      enabled:hover:bg-gray-500
      text-font-500 enabled:hover:text-kadscan-500
      py-1 md:py-2 md:px-3 px-2 rounded md:rounded-lg border border-gray-300 flex items-center justify-center
    "
  >
    <IconChevron
      v-if="isNextOrPrev"
      :class="button === 'prev' && 'rotate-180'"
    />

    <span
      v-else
      class="capitalize text-xs font-medium leading-[150%]"
    >
      {{ label }}
    </span>
  </button>
</template>
