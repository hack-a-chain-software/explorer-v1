<script setup lang="ts">
const props = defineProps<{
  value: string | number | undefined;
  isSmall?: boolean
}>()

const open = ref(false)

const [trigger, container] = usePopper({
  placement: 'top'
})

const copyToClipboard = async (value: string | number) => {
  try {
    await navigator.clipboard.writeText(value + '')

    return new Promise(resolve => setTimeout(resolve, 420));
  } catch (e) {
    console.warn(e)
  }
}

const onCopy = async () => {
  open.value = true

  await copyToClipboard(props.value || '')

  open.value = false
}
</script>

<template>
  <div
    ref="trigger"
  >
    <div
      v-if="open"
      ref="container"
    >
      <div
        class="
          w-[72px] h-[33px] border bg-gray-700 border-gray-300 rounded grid place-items-center
        "
      >
        <span
          class="text-sm leading-[19.6px] relative"
        >
          Copied
        </span>
      </div>

      <div
        class="w-[15px] h-[15px] bg-gray-300  rotate-45 z-[-1] absolute bottom-[-4px] left-1/2 -translate-x-1/2"
      />
    </div>

    <button
      @click.prevent="onCopy()"
      class="p-1.5 rounded-lg hover:bg-gray-500 place-items-center grid"
      :class="isSmall && '!p-1'"
    >
      <IconCopy
        class="w-5 h-5 text-white"
        :class="[open && '!text-kadscan-500']"
      />
    </button>
  </div>
</template>
