<script setup lang="ts">
const {
  routes,
  networks
} = useAppConfig()

const linkRoutes = computed(() => routes.filter(({ type }) => type === 'link'))

const groupRoutes = computed(() => routes.filter(({ type }) => type === 'group'))
</script>

<template>
  <div
    class="w-full bg-gray-800"
  >
    <div
      class="w-full max-w-screen-bazk mx-auto px-4 py-6 md:py-8 flex flex-col gap-6"
    >
      <div
        class="flex justify-between gap-4 flex-wrap"
      >
        <div
          class="flex flex-col gap-2 md:gap-2.5 max-w-[360px]"
        >
          <IconLogoColor
            class="h-[38px] md:h-[42px] w-max"
          />

          <div>
            <span
              class="text-sm text-font-500 leading-[19.6px] block"
            >
              Kadscan is the leading blockchain explorer dedicated to the Kadena ecosystem. Powered by Hack-a-Chain.
            </span>

            <div
              class="pt-4"
            >
              <img
                src="/hackachain.svg"
                class="h-[32px]"
              />
            </div>
          </div>

          <!-- <div
            class="flex items-center gap-4 pt-2 md:pt-0"
          >
            <Network
              v-for="network in networks"
              :key="network.to"
              :to="network.to"
              target="__blank"
              :icon="network.icon"
            />
          </div> -->
        </div>

        <div
          class="flex justify-between w-full md:w-auto flex-wrap gap-3 md:gap-6"
        >
          <div
            class="flex flex-col md:min-w-[180px] gap-2 md:gap-3 grow"
          >
            <span
              class="text-font-400 text-lg md:text-base md:font-[400] font-semibold"
            >
              Overview
            </span>

            <NuxtLink
              :to="link.path"
              :tag="'footer-overview-'+link.tag"
              v-for="link in linkRoutes"
              class="text-font-500 text-sm"
            >
              {{ link.label }}
            </NuxtLink>
          </div>

          <div
            :key="'footer-group-'+group.tag"
            class="flex flex-col md:min-w-[180px] gap-2 md:gap-3 grow"
            v-for="group of groupRoutes"
          >
            <span
              class="text-font-400 text-lg md:text-base md:font-[400] font-semibold"
            >
              {{ group.label }}
            </span>

            <NuxtLink
              :to="subroute.path"
              :tag="'footer-subroute-'+subroute.tag"
              v-for="subroute in group.subroutes"
              class="text-font-500 text-sm"
            >
              {{ subroute.label }}
            </NuxtLink>

          </div>
        </div>
      </div>

      <div
        class="border-t border-t-gray-300 pt-6 flex items-center justify-center"
      >
        <IconLogoWhite
          class="h-[22px] w-[110px] relative -top-[2px]"
        />

        <span
          class="text-font-400"
        >
          © 2024
        </span>
      </div>
    </div>
  </div>
</template>
