<script setup lang="ts">
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
}>();

const data = reactive({
  open: false,
})

function close () {
  data.open = false;
}

function open () {
  data.open = true;
}
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

    <div
      v-else
      @mouseenter="open"
      @mouseleave="close"
      v-outside="close"
      class="relative"
    >
      <NuxtLink
        :to="props.path || ''"
        :class="data.open ? 'text-kadscan-500' : 'text-font-400'"
        class="hover:text-kadscan-500 flex items-center justify-center gap-2 px-3 py-2 ring-0 outline-none h-full"
      >
        <span
          class="text-sm"
        >
          {{ props.label }}
        </span>

        <IconArrow
          class="transition"
          :class="data.open ? 'rotate-90' : '-rotate-90'"
        />
      </NuxtLink>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <div
          v-if="data.open"
          class=" md:absolute right-0 top-[calc(100%)] pt-4"
        >
          <div
            class="
              px-2
              pb-3
              pt-2
              border-t-[2px] border-t-kadscan-500 bg-gray-700 rounded-b-lg w-[240px]
            "
          >
            <div
              class="flex flex-col gap-2"
            >
              <NuxtLink
                @click="close"
                :to="subroute.path"
                :key="subroute.tag"
                class="p-3 text-sm text-font-400 hover:text-kadscan-500"
                v-for="subroute in props.subroutes ?? []"
              >
                {{ subroute.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
