<script setup lang="ts">
import {
  provideUseId,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'

const config = useAppConfig()

provideUseId(() => useId());

const route = useRoute()
</script>

<template>
  <Disclosure
    as="header"
    v-slot="{ open }"
    class="w-full flex flex-col items-center justify-center bg-gray-800 z-[10]"
  >
    <div
      class="w-full max-w-screen-bazk py-3 px-4 flex justify-between"
      :class="route.name !== 'index' ? 'md:py-3' : 'md:py-4'"
    >
      <NuxtLink
        to="/"
        class="flex items-center"
      >
        <IconLogoWhite
          class="h-7 md:h-8"
        />
      </NuxtLink>

      <div
        class="hidden md:flex w-full items-center justify-end gap-2"
      >
        <HeaderSearch
          variant="secondary"
          v-if="route.name !== 'index'"
        />

        <HeaderRoute
          :key="route.tag + i"
          v-bind="route"
          v-for="(route, i) in config.routes"
        />
      </div>

      <DisclosureButton
        class="md:hidden h-8 w-8 rounded p-1 bg-gray-700"
      >
        <IconMenu
          v-if="!open"
          class="w-6 h-6"
        />

        <IconX
          v-else
          class="w-6 h-6"
        />
      </DisclosureButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <DisclosurePanel
        class="flex lg:hidden w-full gap-2 flex-col pt-1 pb-3 px-4"
      >
        <HeaderRouteMobile
          :key="route.tag + i + '-mobile'"
          v-bind="route"
          v-for="(route, i) in config.routes"
        />
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>
