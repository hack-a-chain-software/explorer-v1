<script setup lang="ts">
import {
  provideUseId,
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

const props = defineProps<{
  modelValue: any;
  items: any[];
}>()

const emit = defineEmits(['update:modelValue'])

provideUseId(() => useId())
</script>

<template>
  <div>
    <Listbox
      v-slot="{ open }"
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
    >
      <div
        class="relative"
      >
        <ListboxButton
          class="hover:text-kadscan-500 flex items-center justify-center gap-2 px-3 py-2 ring-0 outline-none shrink-0"
        >
          <span
            class="text-sm text-font-400 whitespace-nowrap block"
          >
            {{ modelValue.label }}
          </span>

          <IconArrow
            class="transition shrink-0 h-5 w-5"
            :class="open ? 'rotate-90 text-kadscan-500' : '-rotate-90 text-font-500'"
          />
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="
              z-[99999]
              w-[180px]
              p-2
              border border-gray-300
              rounded-lg
              absolute
              left-0
              top-[calc(100%+8px)]
              bg-gray-700
            "
          >
            <ListboxOption
              v-for="item in items"
              :key="item.value"
              :value="item"
              as="template"
            >
              <li
                class="px-4 py-2 hover:opacity-[0.7] cursor-pointer"
              >
                <span
                  class="
                    text-sm
                    text-font-400
                  "
                >
                  {{ item.label }}
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
