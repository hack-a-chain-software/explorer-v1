<script setup lang="ts">
import {
  IconGithub as github,
  IconDiscord as discord,
  IconTwitter as twitter,
  IconTelegram as telegram,
} from '#components'

const icons = {
  github,
  discord,
  twitter,
  telegram
}

withDefaults(
  defineProps<{
    to: string
    icon: 'github' | 'discord' | 'twitter' | 'telegram'
  }>(),
  {
    icon: 'twitter'
  }
)
</script>
<template>
  <NuxtLink
    :to="to"
    class="p-2 rounded-lg border-gray-300 border hover:bg-gray-300"
  >
    <component :is="icons[icon]" class="w-5 h-5" />
  </NuxtLink>
</template>
