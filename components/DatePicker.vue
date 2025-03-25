<script setup lang="ts">
import { format } from 'date-fns';
import { provideUseId, Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const props = defineProps({
  modelValue: {
    type: [Date, Object] as PropType<any | null>,
    default: null
  }
})

const emit = defineEmits(['update:model-value', 'close'])

provideUseId(() => useId())

const label = computed(() => {
  if (props.modelValue) {
    return `${format(props.modelValue.start, 'dd/MM/yyyy')} - ${format(props.modelValue.end, 'dd/MM/yyyy')}`
  }

  return 'Filter Date'
})
</script>

<template>
  <div>
    <client-only>
      <Popover
        v-slot="{ open, close }"
        class="relative"
        inheritAttrs
      >
        <PopoverButton
          :class="open ? 'text-kadscan-500' : 'text-font-400'"
          class="px-3 py-2 rounded-lg border border-gray-300 flex items-center gap-2"
        >
          <IconCalendar
            class="h-5 shrink-0"
          />

          <span
            class="text-xs text-font-400 font-[500] leading-[12px]"
          >
            {{ label }}
          </span>

          <button
            v-if="modelValue"
            @click.prevent="emit('update:model-value', null)"
          >
            <IconX
              class="shrink-0"
            />
          </button>
        </PopoverButton>

        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <PopoverPanel
            class="
              px-2
              pb-3
              pt-2
              absolute left-0 top-[calc(100%+16px)]
            "
          >
              <Calendar
                :modelValue="modelValue"
                @update:modelValue="emit('update:model-value', $event)"
                @close="close"
              />
          </PopoverPanel>
        </transition>
      </Popover>
    </client-only>
  </div>
</template>
