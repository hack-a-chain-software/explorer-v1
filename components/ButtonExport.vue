<script setup lang="ts">
const props = defineProps<{
  entry: any,
  type: 'transaction' | 'block',
  filename: string,
}>();

const converter = props.type === 'transaction' ? transactionToCsv : blockToCsv
</script>

<template>
  <div>
    <Button
      size="large"
      icon="receive"
      label="CSV Export"
      @click="downloadCSV(converter(entry), filename)"
    />
  </div>
</template>
