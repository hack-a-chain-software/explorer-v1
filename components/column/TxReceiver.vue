<script setup lang="ts">
const props = defineProps<{
  row: any
}>()


const lastTransfer = useLatestTransfer(props.row.transfersByTransactionId.nodes)
</script>

<template>
  <ColumnAddress
    :value="lastTransfer.toAcct"
  />
</template>
