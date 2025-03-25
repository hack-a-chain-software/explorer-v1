<script setup lang="ts">
withDefaults(
  defineProps<{
  value?: string,
  }>(),
  {
    value: 'Lorem ipsum dollor'
  }
)

const open = ref(false)

const [trigger, container] = usePopper({
  placement: 'top'
})

let openTimeout: NodeJS.Timeout | null = null
let closeTimeout: NodeJS.Timeout | null = null

const onMouseEnter = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }

  if (open.value) {
    return
  }

  openTimeout = openTimeout || setTimeout(() => {
    open.value = true
    openTimeout = null
  }, 140)
}

const onMouseLeave = () => {
  if (openTimeout) {
    clearTimeout(openTimeout)
    openTimeout = null
  }

  if (!open.value) {
    return
  }
  closeTimeout = closeTimeout || setTimeout(() => {
    open.value = false
    closeTimeout = null
  }, 140)
}
</script>

<template>
  <div
    ref="trigger"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      v-if="open"
      ref="container"
    >
      <div
        class="
          w-max
          max-w-[336px]
          text-center
          p-2
          bg-gray-400 rounded grid place-items-center
        "
      >
        <span
          class="text-white text-xs leading-[19.6px] relative font-[500]"
        >
          {{ value }}
        </span>
      </div>

      <div
        class="hidden md:block w-[15px] h-[15px] bg-gray-400 rotate-45 z-[-1] absolute bottom-[-4px] left-1/2 -translate-x-1/2"
      />
    </div>

    <div
      class="group cursor-pointer"
    >
      <IconInformation
        class="group-hover:text-kadscan-500 text-font-500"
      />
    </div>
  </div>
</template>
