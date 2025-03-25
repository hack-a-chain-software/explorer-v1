<script setup lang="ts">
import { IconArrowRight, IconReceive } from '#components'

const props = withDefaults(
  defineProps<{
    label: string,
    icon?: 'arrowRight' | 'receive',
    iconPosition?: 'left' | 'right',
    size?: 'small' | 'medium' | 'large',
    type?: 'outline' | 'filled' | 'double' | 'icon',
  }>(),
  {
    icon: 'arrowRight',
    iconPosition: 'right',
    size: 'small',
    type: 'filled',
  }
)

const iconWidth = computed(() => ({
  large: '24px',
  medium: '18px',
  small: '16px',
}[props.size]));

const rootSizes = {
  large: 'px-4 py-2',
  small: 'px-2 py-1 !rounded',
  medium: 'px-3 py-2',
}

const labelSizes = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
}

const rootClass = {
  filled: 'bg-gray-600 hover:bg-gray-500',
  icon: 'bg-transparent hover:bg-gray-500',
  outline: 'bg-transparent border border-gray-300',
  double: 'bg-transparent border border-gray-300 hover:bg-gray-500',
}

const icons = {
  arrowRight: IconArrowRight,
  receive: IconReceive,
}
</script>

<template>
  <button
    :class="[
      rootSizes[props.size],
      rootClass[props.type],
      iconPosition === 'left' && 'flex-row-reverse',
    ]"
    class="rounded-lg group box-border w-auto h-auto flex w-full items-center"
  >
    <span
      class="text-font-400 group-hover:text-kadscan-500 block"
      :class="[
        labelSizes[props.size]
      ]"
    >
      {{ props.label }}
    </span>

    <component
      v-if="icon"
      :is="icons[icon]"
      class="
        w-0
        z-[2]
        relative
        text-font-400 group-hover:text-kadscan-500
        duration-[0.3s]
        translate-y-[-5%]
        shrink-0
        icon-transition
      "
      :style="{ '--icon-width': iconWidth }"
    />
  </button>
</template>

<style scoped>
.icon-transition {
  width: 0;
  transition: width 0.2s ease-in-out;
}

.group:hover .icon-transition {
  width: var(--icon-width);
  margin-left: 4px;
}
</style>
