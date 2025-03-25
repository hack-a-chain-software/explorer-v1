<script setup lang="ts">
import { format } from 'date-fns'

const props = defineProps<{
  gas: string,
  nodeId: string,
  sender: string,
  result: string,
  gasprice: string,
  chainId: number,
  createdAt: string,
  requestkey: string,
  // transfersByTransactionId: any
}>()

const status = useTransactionStatus(props.result)

// const lastTransfer = useLatestTransfer(props.transfersByTransactionId.nodes)

const gasInKDA = computed(() => {
  const gasAmount = parseFloat(props.gas)
  const gasPriceInKDA = parseFloat(props.gasprice)
  const gasKDA = gasAmount * gasPriceInKDA
  return gasKDA.toFixed(8) // 8 decimal places, adjust as needed
})

const gasDisplay = computed(() => {
  return `${customInteger(gasInKDA.value)} KDA`
})

const createdAt = useState('date', () => format(new Date(props.createdAt), 'dd MMM y HH:mm:ss'));
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-3 xl:gap-4 py-3 border-b lg:h-[111px] border-b-gray-300 xl:max-h-[82px]"
  >
    <NuxtLink
      :to="`/transactions/${props.requestkey}`"
    >
      <IconStatus
        :status="status"
      />
    </NuxtLink>

    <div
      class="flex xl:flex-col gap-4 grow"
    >
      <Value
        isLink
        label="Request Key"
        :to="`/transactions/${props.requestkey}`"
        :value="shortenString(props.requestkey)"
      />

      <Value
        label="Chain"
        :value="props.chainId"
      />
    </div>

    <div
      class="flex xl:flex-col gap-4 xl:mx-auto grow"
    >
      <Value
        isLink
        label="Sender"
        :to="`/account/${sender}`"
        :value="shortenAddress(sender)"
      />

      <Value
        label="Gas"
        :value="gasDisplay"
      />
    </div>

    <div
      class="flex  h-full w-full xl:w-auto xl:justify-start xl:flex-col xl:ml-auto"
    >
      <!-- <div
        class="flex px-2 py-1 border border-gray-300 rounded"
      >
        <span
          class="text-font-450 text-xs"
        >
          {{ `${Number(lastTransfer?.amount).toPrecision(2)} ${lastTransfer?.modulename}`}}
        </span>
      </div> -->

      <Value
        :value="createdAt"
      />
    </div>
  </div>
</template>
