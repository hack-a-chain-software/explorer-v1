<script setup lang="ts">
</script>

<template>
  <HomeList
    label="Recent Transactions"
  >
    <div
      v-for="n in 5"
      :key="`skeleton-recent-transactions-${n}`"
      class="flex flex-wrap items-center gap-3 xl:gap-4 py-3 border-b lg:h-[111px] border-b-gray-300 xl:max-h-[82px]"
    >
      <div
        class="mb-auto xl:mb-0 bg-gray-200 rounded-lg h-12 w-12"
      />

      <div
        class="flex xl:flex-col gap-4 grow xl:max-w-[190px]"
      >
        <Value
          label="Request Key"
          value=""
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
          label="Sender"
          value=""
        />

        <Value
          label="Gas"
          value=""
        />
      </div>

      <div
        class="flex h-full w-full xl:w-auto xl:justify-start xl:flex-col xl:ml-auto xl:max-w-[180px] xl:grow"
      >
        <Value
          value=""
        />
      </div>
    </div>
  </HomeList>
</template>
