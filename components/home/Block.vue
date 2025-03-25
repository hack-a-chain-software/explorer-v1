<script setup lang="ts">
import { format } from 'date-fns'

const props = defineProps<{
  parent: string,
  nodeId: string,
  chainId: number,
  height: number,
  hash: string,
  createdAt: any,
  minerData: string,
  coinbase: string,
  transactionsCount: string,
  // transactionsByBlockId: any,
}>()

const status = computed((): 'success' | 'error' => {
  return props.parent ? 'success' : 'error'
})

const miner = useBlockMiner(props.minerData)

const coinbase = useBlockMiner(props.coinbase)

const createdAt = useState('date', () => format(new Date(props.createdAt), 'dd MMM y HH:mm:ss'));
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-3 xl:gap-4 py-3 lg:h-[111px] xl:max-h-[82px] border-b border-b-gray-300"
  >
    <NuxtLink
      :to="`/blocks/chain/${props.chainId}/height/${props.height}`"
      class="mb-auto xl:mb-0"
    >
      <IconStatus
        :status="status"
      />
    </NuxtLink>

    <div
      class="flex xl:flex-col gap-4 grow xl:min-w-[150px]"
    >
      <Value
        isLink
        :value="shortenAddress(miner.account)"
        label="Miner"
        :to="`/account/${miner.account}`"
        class="xl:w-full "
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
        label="Block"
        :value="props.height"
        :to="`/blocks/chain/${props.chainId}/height/${props.height}`"
      />

      <Value
        label="Fees"
        :value="coinbase.events[0].params[2].toFixed(4) + ' KDA'"
      />
    </div>

    <div
      class="flex flex-row-reverse justify-between w-full xl:w-auto xl:justify-start xl:flex-col items-end gap-4 xl:ml-auto"
    >
      <Value
        label="Transactions"
        :value="transactionsCount"
        class="!flex-row flex-grow xl:w-full"
      />

      <Value
        :value="createdAt"
      />
    </div>
  </div>
</template>
