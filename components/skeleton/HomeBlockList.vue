<script setup lang="ts">
//
</script>

<template>
  <HomeList
    label="Recent Blocks"
  >
    <div
      v-for="n in 5"
      :key="`skeleton-recent-blocks-${n}`"
      class="flex flex-wrap items-center gap-3 xl:gap-4 py-3 lg:h-[111px] xl:max-h-[82px] border-b border-b-gray-300"
    >
      <div
        class="mb-auto xl:mb-0 bg-gray-200 rounded-lg h-12 w-12"
      />

      <div
        class="flex xl:flex-col gap-4 grow xl:min-w-[150px] xl:max-w-[176px]"
      >
        <Value
          value=""
          label="Miner"
          class="xl:w-full"
        />

        <Value
          label="Chain"
          value=""
        />
      </div>

      <div
        class="flex xl:flex-col gap-4 xl:mx-auto grow xl:max-w-[130px]"
      >
        <Value
          value=""
          label="Block"
        />

        <Value
          label="Fees"
          value=""
        />
      </div>

      <div
        class="flex flex-row-reverse justify-between w-full xl:w-auto xl:justify-start xl:flex-col items-end gap-4 xl:ml-auto  xlmax-w-[186px] grow"
      >
        <Value
          value=""
          label="Transactions"
          class="!flex-row flex-grow xl:w-full w-full"
        />

        <Value
          value=""
          class="w-full"
        />
      </div>
    </div>
  </HomeList>
</template>
