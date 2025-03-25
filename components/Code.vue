<script lang="ts" setup>
withDefaults(
  defineProps<{
    value?: string | any
  }>(),
  {
    value: '',
  }
)
</script>

<template>
  <HighlightValue>
    <pre class="break-all whitespace-pre-wrap">{{ value }}</pre>
  </HighlightValue>
</template>
