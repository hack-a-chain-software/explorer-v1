<script setup lang="ts">
defineProps<{
  tokens: any,
}>()
</script>

<template>
  <div
    class="flex flex-col"
  >
    <div
      class="pb-2"
    >
      <span
        class="text-white text-sm"
      >
        Tokens
      </span>
    </div>

    <SearchViewTokensItem
      v-bind="tokens"
      class="py-3"
      :key="'tokens:'+tokens.id"
      v-for="(tokens, i) in tokens"
      :class="[!((i + 1) === tokens.length) && '!border-b border-b-gray-300']"
    />
  </div>
</template>
