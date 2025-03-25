<script setup lang="ts">
defineProps<{
  events: any
}>()
</script>

<template>
  <PageRoot>
    <LabelValue
      :key="id"
      :label="`${module }.${name}`"
      v-for="{ id, module, name, params } in events"
    >
      <template #value>
        <Code
          :value="param"
          :key="`event-${name}-${param}`"
          v-for="param in JSON.parse(params)"
        />
      </template>
    </LabelValue>
  </PageRoot>
</template>
