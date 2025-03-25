<script setup lang="ts">
const props = defineProps<{
  result: string,
  chainId: number,
  requestkey: string,
}>()

const status = useTransactionStatus(props.result)
</script>

<template>
  <NuxtLink
    :to="`/transactions/${requestkey}`"
    class="py-3 flex gap-2 hover:opacity-[0.8]"
  >
    <IconStatus
      :status="status"
      class="mb-auto xl:mb-0 w-[28px] h-[28px]"
    />

    <div
      class="flex flex-col truncate"
    >
      <span
        class="text-font-400 text-sm truncate block"
      >
        {{ requestkey }}
      </span>

      <div>
        <span
          class="text-font-500 text-xs"
        >
          Chain Id: {{ chainId }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
