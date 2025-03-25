<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import { provideUseId } from '@headlessui/vue'

provideUseId(() => useId())

interface BaseRoute {
  path?: string;
  tag: string;
  label: string;
}

const props = defineProps<{
  tag: string,
  path?: string,
  label: string,
  type: 'group' | 'link',
  subroutes?: BaseRoute[];
}>()
</script>

<template>
  <div>
    <NuxtLink
      :to="props.path"
      v-if="props.type === 'link'"
      class="px-3 py-2 text-font-400 hover:text-kadscan-500 block"
    >
      {{ props.label }}
    </NuxtLink>

    <Disclosure
      as="div"
      v-else
      v-slot="{ open }"
    >
      <DisclosureButton
        :class="open ? 'text-kadscan-500' : 'text-font-400'"
        class="hover:text-kadscan-500 flex items-center justify-between w-full gap-2 px-3 py-2 ring-0 outline-none"
      >
        <span
          class="text-sm"
        >
          {{ props.label }}
        </span>

        <IconArrow
          class="transition"
          :class="open ? 'rotate-90' : '-rotate-90'"
        />
      </DisclosureButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <DisclosurePanel
          class="flex bazk:hidden w-full gap-2 flex-col pt-[6px] pb-2 px-2 border-t-[2px] border-t-kadscan-500 bg-gray-700 rounded-b-lg w-[240px]"
        >
          <div
            class="flex flex-col gap-2"
          >
            <NuxtLink
              :to="subroute.path"
              :key="subroute.tag"
              class="p-2 text-sm text-font-400 hover:text-kadscan-500"
              v-for="subroute in props.subroutes ?? []"
            >
              {{ subroute.label }}
            </NuxtLink>
          </div>
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>
