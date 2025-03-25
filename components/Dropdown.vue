<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const props = defineProps<{
  label: string;
  items: any[];
}>()
</script>

<template>
  <div>
    <Menu
      v-slot="{ open }"
      as="div"
      class="relative inline-block text-left"
    >
      <div>
        <MenuButton
          class="hover:text-kadscan-500 flex items-center justify-center gap-2 px-3 py-2 ring-0 outline-none"
        >
          <span
            class="text-sm text-font-400"
          >
            {{ label }}
          </span>

          <IconArrow
            class="transition"
            :class="open ? 'rotate-90 text-kadscan-500' : '-rotate-90 text-font-500'"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="
            absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none
          "
        >
          <div class="px-1 py-1">
            <MenuItem
              :key="item.tag"
              v-for="item in items"
              v-slot="{ active }"
            >
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <EditIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                />
                Edit
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
