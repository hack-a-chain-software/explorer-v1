<script setup lang="ts">
const props = defineProps<{
  label: string,
  path?: string
}>()
</script>

<template>
  <Container>
    <div
      class="flex justify-between items-center pb-2 lg:pb-4 border-b border-b-gray-300"
    >
      <span
        class="text-lg text-font-400 font-semibold leading-[26px] block lg:leading-[25.2px]"
      >
        {{ label }}
      </span>

      <NuxtLink
        v-if="path"
        :to="path"
        class="flex items-center"
      >
        <Button
          label="View All"
          size="medium"
          class="hidden lg:flex"
        />

        <Button
          label="View All"
          size="small"
          class="lg:hidden"
        />
      </NuxtLink>
    </div>

    <div>
      <slot />
    </div>
  </Container>
</template>
